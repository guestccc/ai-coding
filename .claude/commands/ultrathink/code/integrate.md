# /ut:code/integrate

**命令描述**: 调用集成测试Agent完成前后端集成和API切换
**交互消耗**: 🟡 中消耗 (3-4次)
**激活Agent**: integration.md

## 命令用法

```bash
/ut:code/integrate [前后端集成和测试]
```

## 前置依赖

- ✅ 必须存在: 前端代码、后端代码、Mock服务
- 📋 建议存在: `docs/test-plan.md`

## 执行流程

### 1. API切换机制实现
```yaml
环境配置:
  - 开发环境: Mock Service Worker
  - 测试环境: 真实API + Test Database
  - 生产环境: 生产API

切换机制:
  - 环境变量控制
  - 运行时动态切换
  - 优雅降级处理
```

### 2. 集成测试实施
基于@docs/test-plan.md执行：
```yaml
API契约测试:
  - OpenAPI规范一致性验证
  - 请求/响应格式验证
  - 错误处理一致性测试

端到端测试:
  - 完整用户流程测试
  - 跨页面数据流测试
  - 业务场景验证

性能集成测试:
  - API响应时间测试
  - 前端页面加载测试
  - 并发用户测试
```

### 3. 数据流集成验证
```yaml
前后端数据流:
  - 数据格式一致性
  - 状态同步验证
  - 缓存一致性检查

错误处理集成:
  - 网络错误处理
  - 服务器错误处理
  - 客户端错误处理
```

## API切换配置

### 环境配置模板
```typescript
// config/api.ts
interface ApiConfig {
  baseURL: string
  timeout: number
  useMock: boolean
}

const configs: Record<string, ApiConfig> = {
  development: {
    baseURL: 'http://localhost:3001/api/v1',
    timeout: 5000,
    useMock: true, // 开发阶段使用Mock
  },
  
  test: {
    baseURL: 'http://localhost:3001/api/v1',
    timeout: 5000,
    useMock: false, // 测试阶段使用真实API
  },
  
  production: {
    baseURL: process.env.VITE_API_URL || '/api/v1',
    timeout: 10000,
    useMock: false,
  }
}

export const apiConfig = configs[process.env.NODE_ENV || 'development']
```

### API客户端集成
```typescript
// api/client.ts
import axios from 'axios'
import { apiConfig } from '../config/api'
import { worker } from '../mocks/browser'

// Mock服务控制
if (apiConfig.useMock && process.env.NODE_ENV === 'development') {
  worker.start({ onUnhandledRequest: 'bypass' })
}

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器 - 添加认证Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token过期处理
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
```

## 集成测试实现

### E2E测试配置
```typescript
// tests/e2e/setup.ts
import { test as base, expect } from '@playwright/test'
import { server } from '../../mocks/server'

// 测试前启动Mock服务器
export const test = base.extend({
  page: async ({ page }, use) => {
    // 测试环境使用真实API
    process.env.NODE_ENV = 'test'
    
    await use(page)
  }
})

// 全局设置
beforeAll(async () => {
  // 启动测试数据库
  await setupTestDatabase()
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(async () => {
  await cleanupTestDatabase()
  server.close()
})
```

### API契约测试
```typescript
// tests/integration/api-contract.test.ts
import { validateApiResponse } from '../utils/schema-validator'
import apiClient from '../../src/api/client'

describe('API Contract Tests', () => {
  test('POST /api/v1/users - should match OpenAPI schema', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    }
    
    const response = await apiClient.post('/users', userData)
    
    // 验证响应格式符合OpenAPI规范
    expect(validateApiResponse('CreateUser', response.data)).toBe(true)
    expect(response.status).toBe(201)
    expect(response.data.success).toBe(true)
    expect(response.data.data).toHaveProperty('id')
  })
  
  test('GET /api/v1/users - should handle pagination', async () => {
    const response = await apiClient.get('/users?page=1&limit=10')
    
    expect(response.status).toBe(200)
    expect(response.data.data).toBeInstanceOf(Array)
    expect(response.data.pagination).toMatchObject({
      page: 1,
      limit: 10,
      total: expect.any(Number),
      totalPages: expect.any(Number)
    })
  })
})
```

### 端到端业务流程测试
```typescript
// tests/e2e/user-workflow.spec.ts
import { test, expect } from './setup'

test.describe('User Management Workflow', () => {
  test('complete user creation and management flow', async ({ page }) => {
    // 1. 访问登录页
    await page.goto('/login')
    
    // 2. 管理员登录
    await page.fill('[data-testid=username]', 'admin')
    await page.fill('[data-testid=password]', 'admin123')
    await page.click('[data-testid=login-btn]')
    
    // 3. 等待跳转到用户管理页
    await expect(page).toHaveURL('/users')
    
    // 4. 创建新用户
    await page.click('[data-testid=create-user-btn]')
    await page.fill('[data-testid=user-username]', 'newuser')
    await page.fill('[data-testid=user-email]', 'newuser@test.com')
    await page.fill('[data-testid=user-password]', 'password123')
    await page.click('[data-testid=submit-btn]')
    
    // 5. 验证用户创建成功
    await expect(page.locator('[data-testid=success-message]')).toBeVisible()
    await expect(page.locator('text=newuser')).toBeVisible()
    
    // 6. 编辑用户信息
    await page.click('[data-testid=edit-user-btn]')
    await page.fill('[data-testid=user-email]', 'updated@test.com')
    await page.click('[data-testid=save-btn]')
    
    // 7. 验证更新成功
    await expect(page.locator('text=updated@test.com')).toBeVisible()
  })
})
```

## 性能集成测试

### API性能测试
```typescript
// tests/performance/api-performance.test.ts
describe('API Performance Tests', () => {
  test('API响应时间应小于500ms', async () => {
    const start = Date.now()
    const response = await apiClient.get('/users?page=1&limit=20')
    const duration = Date.now() - start
    
    expect(response.status).toBe(200)
    expect(duration).toBeLessThan(500) // 500ms内响应
  })
  
  test('并发请求处理', async () => {
    const promises = Array.from({ length: 10 }, () => 
      apiClient.get('/users')
    )
    
    const start = Date.now()
    const responses = await Promise.all(promises)
    const duration = Date.now() - start
    
    // 所有请求都成功
    responses.forEach(response => {
      expect(response.status).toBe(200)
    })
    
    // 并发处理时间合理
    expect(duration).toBeLessThan(2000)
  })
})
```

## 输出文件结构

**主要输出**: 完整集成配置和测试
```yaml
生成内容:
  ✅ API切换配置 (config/api.ts)
  ✅ 客户端集成 (api/client.ts)
  ✅ 测试环境配置 (tests/setup.ts)
  ✅ API契约测试 (tests/integration/)
  ✅ E2E业务流程测试 (tests/e2e/)
  ✅ 性能集成测试 (tests/performance/)
  ✅ Docker集成配置 (docker-compose.yml)
```

## 环境管理

### Docker集成配置
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./src/frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:3001/api/v1
    depends_on:
      - backend

  backend:
    build: ./src/backend  
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/app
      - JWT_SECRET=your-secret-key
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=app
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 质量门禁集成

### CI/CD Pipeline
```yaml
# .github/workflows/integration.yml
name: Integration Tests

on: [push, pull_request]

jobs:
  integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          npm install
          cd src/frontend && npm install
          cd src/backend && npm install
          
      - name: Start services
        run: docker-compose up -d
        
      - name: Wait for services
        run: sleep 30
        
      - name: Run integration tests
        run: npm run test:integration
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Cleanup
        run: docker-compose down
```

## Agent协作

**上游输入**:
- ← frontend-developer.md (前端应用)
- ← backend-developer.md (后端服务)
- ← Mock服务配置

**输出验证**: 完整系统集成验证报告

## 质量标准

- ✅ API契约100%一致性验证
- ✅ 端到端测试覆盖所有P0功能
- ✅ 性能指标达标 (API<500ms, 页面<3s)
- ✅ 错误处理全场景覆盖
- ✅ 多环境配置正确
- ✅ CI/CD集成验证通过

## 示例用法

```bash
# 完整前后端集成
/ut:code/integrate

# 专注性能测试集成
/ut:code/integrate "performance-focused"

# 包含安全测试
/ut:code/integrate "security-testing"
```

## 最佳实践

1. **环境隔离**: 开发、测试、生产环境清晰分离
2. **API契约**: 严格遵循OpenAPI规范进行验证
3. **测试数据**: 独立测试数据库，测试后清理
4. **监控集成**: 集成监控和日志系统
5. **部署验证**: 部署后自动化冒烟测试