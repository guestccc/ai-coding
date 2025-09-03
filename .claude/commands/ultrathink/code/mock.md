# /ut:code/mock

**命令描述**: 生成Mock数据服务，支持前端独立开发
**交互消耗**: 🟢 低消耗 (1-2次)
**激活Agent**: integration.md

## 命令用法

```bash
/ut:code/mock [基于OpenAPI规范]
```

## 前置依赖

- ✅ 必须存在: `docs/openapi.yaml`
- 📋 建议存在: `docs/test-plan.md`

## 执行流程

### 1. Mock服务配置
```bash
# MSW (Mock Service Worker) 安装
npm install -D msw @mswjs/data faker

# Mock服务初始化
npx msw init public/ --save
```

### 2. Mock数据生成
基于@docs/openapi.yaml自动生成：
```yaml
数据模型:
  - OpenAPI Schema → Mock数据模型
  - Faker.js → 真实感数据生成
  - 关联关系处理
  - 边界数据和异常场景

API端点:
  - 完整CRUD操作Mock
  - 分页和搜索功能
  - 错误状态模拟
  - 响应延迟模拟
```

### 3. Mock服务器配置
```yaml
开发模式:
  - 浏览器Service Worker
  - 开发服务器集成
  - 热重载支持
  - 调试工具集成

测试模式:
  - Node.js Mock服务器
  - 测试数据隔离
  - 可重复测试数据
  - 并发测试支持
```

## Mock数据策略

### 数据生成规则
```yaml
基础数据类型:
  string: Faker随机字符串 (name, email, address)
  number: 随机数值范围
  boolean: 随机布尔值
  date: 合理时间范围

业务数据类型:
  - 用户数据: 真实姓名、邮箱、头像
  - 商品数据: 产品名称、价格、图片
  - 订单数据: 订单号、状态、时间

关联数据:
  - 外键关联自动处理
  - 一对多关系数据
  - 多对多关系数据
  - 递归关联数据
```

### 场景化数据
```yaml
正常场景:
  - 标准业务流程数据
  - 完整数据字段
  - 合理的数据关联

边界场景:
  - 空数据集合
  - 最大最小值数据
  - 特殊字符数据

异常场景:
  - 404错误响应
  - 500服务器错误
  - 网络超时模拟
  - 权限错误场景
```

## 输出文件结构

**主要输出**: Mock服务完整配置
```yaml
生成内容:
  ✅ Mock配置文件 (mocks/index.ts)
  ✅ 数据模型定义 (mocks/models.ts)
  ✅ API处理器 (mocks/handlers/)
  ✅ 测试数据夹具 (mocks/fixtures/)
  ✅ Mock服务器 (mocks/server.ts)
  ✅ 浏览器worker (public/mockServiceWorker.js)
```

## Mock服务实现

### MSW Handler模板
```typescript
// mocks/handlers/userHandlers.ts
import { rest } from 'msw'
import { db } from '../db'

export const userHandlers = [
  // 获取用户列表
  rest.get('/api/v1/users', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1
    const limit = Number(req.url.searchParams.get('limit')) || 20
    
    const users = db.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })
    
    return res(
      ctx.delay(100), // 模拟网络延迟
      ctx.json({
        success: true,
        data: users,
        pagination: {
          page,
          limit,
          total: db.user.count(),
          totalPages: Math.ceil(db.user.count() / limit)
        }
      })
    )
  }),

  // 创建用户
  rest.post('/api/v1/users', (req, res, ctx) => {
    const userData = req.body
    
    // 模拟验证错误
    if (!userData.email) {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          message: 'Email is required',
          errors: [{ field: 'email', message: 'Required field' }]
        })
      )
    }
    
    const user = db.user.create(userData)
    
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: user,
        message: 'User created successfully'
      })
    )
  }),

  // 模拟服务器错误
  rest.delete('/api/v1/users/:id', (req, res, ctx) => {
    // 10%概率返回服务器错误用于测试错误处理
    if (Math.random() < 0.1) {
      return res(
        ctx.status(500),
        ctx.json({
          success: false,
          message: 'Internal server error'
        })
      )
    }
    
    db.user.delete({ where: { id: { equals: req.params.id } } })
    
    return res(
      ctx.json({
        success: true,
        message: 'User deleted successfully'
      })
    )
  })
]
```

### Mock数据库
```typescript
// mocks/db.ts
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const db = factory({
  user: {
    id: primaryKey(faker.datatype.uuid),
    username: faker.internet.userName,
    email: faker.internet.email,
    avatar: faker.image.avatar,
    role: () => faker.helpers.arrayElement(['admin', 'user']),
    createdAt: faker.date.recent,
    updatedAt: faker.date.recent,
  },
  
  post: {
    id: primaryKey(faker.datatype.uuid),
    title: faker.lorem.sentence,
    content: faker.lorem.paragraphs,
    published: faker.datatype.boolean,
    authorId: String,
    createdAt: faker.date.recent,
    updatedAt: faker.date.recent,
  }
})

// 生成初始测试数据
Array.from({ length: 50 }, () => db.user.create())
Array.from({ length: 100 }, () => {
  const users = db.user.getAll()
  return db.post.create({
    authorId: faker.helpers.arrayElement(users).id
  })
})
```

### Mock服务器配置
```typescript
// mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// 测试环境配置
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### 浏览器集成
```typescript
// mocks/browser.ts
import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// 开发环境启动Mock
if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}
```

## 高级Mock功能

### 状态管理Mock
```yaml
用户状态:
  - 登录/登出状态切换
  - 权限角色变更
  - 个人信息更新

数据状态:
  - 数据创建/更新/删除
  - 关联数据同步更新
  - 乐观更新模拟
```

### 场景切换
```yaml
正常场景: 标准API响应
异常场景: 网络错误、超时、服务器错误
边界场景: 空数据、大数据量、特殊字符
性能场景: 响应延迟、分页加载
```

## 测试集成

### 单元测试集成
```typescript
// 测试中使用Mock服务
import { server } from '../mocks/server'
import { rest } from 'msw'

test('handles user creation error', async () => {
  server.use(
    rest.post('/api/v1/users', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ 
        success: false, 
        message: 'Email already exists' 
      }))
    })
  )
  
  // 测试错误处理逻辑
})
```

## Agent协作

**上游输入**:
- ← architect.md (API规范)

**下游输出**:
- → frontend-developer.md (Mock数据服务)
- → integration.md (测试数据源)

## 质量标准

- ✅ 100% OpenAPI端点覆盖
- ✅ 真实感测试数据生成
- ✅ 错误场景完整模拟
- ✅ 性能场景模拟 (延迟、超时)
- ✅ 开发和测试环境集成
- ✅ 数据一致性保证

## 示例用法

```bash
# 基于OpenAPI生成Mock服务
/ut:code/mock

# 包含高级场景模拟
/ut:code/mock "advanced-scenarios"

# 专注性能测试数据
/ut:code/mock "performance-data"
```

## 最佳实践

1. **数据真实性**: 使用Faker生成真实感数据
2. **场景完整性**: 覆盖正常、异常、边界场景
3. **性能模拟**: 网络延迟和错误率模拟
4. **状态管理**: Mock数据状态与业务逻辑一致
5. **测试友好**: 支持重复测试和数据重置