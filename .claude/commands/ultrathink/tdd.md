# TDD测试驱动开发 (强制要求)

UltraThink框架强制执行TDD（Test-Driven Development）开发模式，确保代码质量和一次性成功率。

## TDD核心理念 🎯

**TDD = 测试先行 + 持续重构 + 质量保证**

在4小时的时间约束下，TDD不是额外负担，而是**质量保险**：
- 减少调试时间
- 提高代码可靠性  
- 支持快速重构
- 确保需求实现

## Red-Green-Refactor循环 🔴🟢🔄

### Red (红色) - 写失败的测试 🔴

**步骤**:
1. 理解需求和用户故事
2. 编写最小可失败的测试用例
3. 运行测试，确认失败 (红色)
4. 确保测试代码质量

**示例** (React组件测试):
```javascript
// 先写测试
describe('LoginForm', () => {
  it('should submit form with valid credentials', () => {
    render(<LoginForm onSubmit={mockSubmit} />)
    
    fireEvent.change(screen.getByLabelText('用户名'), {
      target: { value: 'testuser' }
    })
    fireEvent.change(screen.getByLabelText('密码'), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: '登录' }))
    
    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    })
  })
})
```

### Green (绿色) - 写最少代码使测试通过 🟢

**步骤**:
1. 编写最简单的代码使测试通过
2. 不考虑优化，只求功能正确
3. 运行测试，确认通过 (绿色)
4. 所有测试都必须通过

**示例** (最小实现):
```javascript
// 最简实现 - 先让测试通过
function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ username, password })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        aria-label="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password"
        aria-label="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">登录</button>
    </form>
  )
}
```

### Refactor (重构) - 改进代码保持测试通过 🔄

**步骤**:
1. 在绿色状态下重构代码
2. 改进设计，提取公共逻辑
3. 优化性能和可读性
4. 持续运行测试确保不破坏功能

**示例** (重构后):
```javascript
// 重构 - 添加验证逻辑和错误处理
function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  
  const validateForm = () => {
    const newErrors = {}
    if (!formData.username) newErrors.username = '用户名不能为空'
    if (!formData.password) newErrors.password = '密码不能为空'
    if (formData.password.length < 6) newErrors.password = '密码至少6位'
    return newErrors
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData)
    } else {
      setErrors(formErrors)
    }
  }
  
  // ... JSX实现
}
```

## 测试覆盖率要求 📊

### 覆盖率目标

```yaml
覆盖率要求:
  单元测试: ≥80% (强制要求)
  核心业务: ≥95% (P0功能)
  端到端测试: 100% (用户关键流程)
  
测试分层 (70/20/10原则):
  单元测试: 70% - 快速反馈，隔离测试
  集成测试: 20% - API和数据库测试
  E2E测试: 10% - 用户场景验证
```

### 覆盖率检查命令

```bash
# 前端测试覆盖率
npm test -- --coverage

# 后端测试覆盖率  
npm run test:backend -- --coverage

# 整体覆盖率报告
npm run test:coverage
```

## TDD最佳实践 🏆

### 1. 测试用例设计

**GIVEN-WHEN-THEN模式**:
```javascript
describe('用户认证', () => {
  it('given有效凭据 when用户登录 then返回JWT token', async () => {
    // Given - 准备测试数据
    const credentials = { username: 'test', password: 'pass' }
    const mockToken = 'jwt.token.here'
    jest.spyOn(authService, 'login').mockResolvedValue(mockToken)
    
    // When - 执行被测试的操作
    const result = await loginUser(credentials)
    
    // Then - 验证结果
    expect(result.token).toBe(mockToken)
    expect(authService.login).toHaveBeenCalledWith(credentials)
  })
})
```

### 2. Mock和Stub策略

**外部依赖隔离**:
```javascript
// API调用Mock
jest.mock('../api/userApi', () => ({
  fetchUserProfile: jest.fn(),
  updateUserProfile: jest.fn()
}))

// 数据库操作Mock
const mockRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
}
```

### 3. 测试数据管理

**测试夹具 (Fixtures)**:
```javascript
// fixtures/user.js
export const validUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role: 'user'
}

export const adminUser = {
  id: 2,
  username: 'admin',
  email: 'admin@example.com', 
  role: 'admin'
}
```

## UltraThink TDD工作流 ⚡

### 前端TDD流程

```bash
# 1. 写组件测试
npm run test:watch ComponentName

# 2. 实现组件最小功能
npm run dev

# 3. 重构优化
npm run test && npm run lint

# 4. 集成测试
npm run test:e2e
```

### 后端TDD流程

```bash
# 1. 写API测试
npm run test:api:watch

# 2. 实现API最小功能
npm run dev:api

# 3. 重构优化
npm run test:unit && npm run test:integration

# 4. API文档更新
npm run docs:generate
```

## 质量门禁集成 🚪

### Git Pre-commit钩子

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "🧪 Running TDD quality checks..."

# 运行所有测试
npm test 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Commit rejected."
  exit 1
fi

# 检查覆盖率
npm run test:coverage 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ Coverage below threshold. Commit rejected."
  exit 1
fi

echo "✅ All tests passed. Commit approved."
```

### CI/CD集成

```yaml
# .github/workflows/tdd-check.yml
name: TDD Quality Check
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: 安装依赖
        run: npm install
        
      - name: 运行TDD测试
        run: |
          npm run test:unit
          npm run test:integration
          npm run test:e2e
          
      - name: 检查覆盖率
        run: npm run test:coverage
        
      - name: 上传覆盖率报告
        uses: codecov/codecov-action@v1
```

## TDD常见问题解决 🔧

### Q: TDD会不会拖慢开发速度？
**A**: 在UltraThink的4小时约束下，TDD实际上**加速开发**：
- 减少调试时间 (50%+)
- 避免返工 (一次做对)
- 重构更安全 (测试保护)
- 需求理解更清晰

### Q: 遗留代码如何应用TDD？
**A**: **增量TDD策略**：
- 新功能严格TDD
- 修改现有代码时补充测试
- 重构时优先添加测试覆盖

### Q: 测试代码质量如何保证？
**A**: **测试代码也是代码**：
- Code Review包含测试代码
- 测试代码遵循DRY原则
- 使用测试工具和模式
- 定期重构测试代码

## TDD检查清单 ✅

### 开发前检查
- [ ] 需求和用户故事理解清晰
- [ ] 测试环境配置就绪
- [ ] Mock和Stub策略确定
- [ ] 测试数据准备完成

### 开发中检查
- [ ] 严格遵循Red-Green-Refactor循环
- [ ] 测试用例覆盖边界条件
- [ ] 代码和测试都易读易维护
- [ ] 持续运行所有测试

### 开发后检查
- [ ] 覆盖率达到要求 (≥80%)
- [ ] 所有测试通过
- [ ] 性能测试通过
- [ ] 端到端测试验证
- [ ] 测试报告生成

TDD是UltraThink框架的**核心支柱**，确保在时间压力下仍能交付高质量的可靠代码。