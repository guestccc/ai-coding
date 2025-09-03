# /ut:generate/test

**命令描述**: 调用集成测试Agent生成综合测试计划
**交互消耗**: 🟡 中消耗 (2-3次)
**激活Agent**: integration.md

## 命令用法

```bash
/ut:generate/test [基于完整项目规范]
```

## 前置依赖

- ✅ 必须存在: `docs/PRD.md`, `docs/openapi.yaml`
- 📋 建议存在: `docs/architecture.md`, `docs/prototype.md`

## 执行流程

### 1. 测试需求分析
- **输入**: 所有规格文档 (@docs/*.md, @docs/*.yaml)
- **处理**: 提取测试场景、测试数据、验收标准
- **输出**: 测试需求矩阵

### 2. 测试策略制定
基于测试金字塔原则：
```yaml
测试分层:
  单元测试: 70% (快速反馈，隔离测试)
  集成测试: 20% (API和数据库测试)
  端到端测试: 10% (用户场景验证)

覆盖率要求:
  单元测试: ≥80% 代码覆盖率
  API测试: 100% 端点覆盖
  E2E测试: 100% P0功能覆盖
  核心业务: ≥95% 路径覆盖
```

### 3. 测试用例设计
```yaml
功能性测试:
  - 正常流程测试
  - 边界条件测试
  - 异常处理测试
  - 业务规则验证

非功能性测试:
  - 性能测试 (响应时间<500ms)
  - 安全测试 (认证授权、输入验证)
  - 兼容性测试 (浏览器、设备)
  - 可用性测试 (用户体验)
```

### 4. 测试数据管理
```yaml
测试数据策略:
  - 测试夹具自动生成
  - 数据隔离和清理
  - 敏感数据脱敏
  - 边界值数据集
```

## 输出文件

**主要输出**: `docs/test-plan.md`
```yaml
文档结构:
  1. 测试概述和策略
  2. 测试范围和目标
  3. 测试分层架构
  4. 测试用例设计
  5. 测试数据管理
  6. 测试环境配置
  7. 测试执行计划
  8. 质量标准和验收
```

**次要输出**:
- `tests/unit/` - 单元测试用例模板
- `tests/integration/` - 集成测试用例模板
- `tests/e2e/` - 端到端测试用例模板
- `tests/fixtures/` - 测试数据夹具
- `tests/config/` - 测试环境配置

## TDD实施计划

### Red-Green-Refactor循环
```yaml
Red阶段:
  - 编写失败的测试用例
  - 明确功能预期行为
  - 确保测试用例有意义

Green阶段:
  - 编写最小可用代码
  - 使测试用例通过
  - 避免过度设计

Refactor阶段:
  - 重构代码结构
  - 保持测试通过
  - 提升代码质量
```

### 测试用例模板
```yaml
单元测试模板:
  describe: 测试模块描述
  beforeEach: 测试前置准备
  test cases: 测试用例集合
  afterEach: 测试后置清理

集成测试模板:
  setup: 测试环境准备
  test scenarios: 集成场景测试
  teardown: 环境清理

E2E测试模板:
  user journey: 用户操作路径
  assertions: 结果断言
  cleanup: 数据清理
```

## 测试工具配置

### 前端测试
```yaml
单元测试: Jest + Testing Library
组件测试: React Testing Library
集成测试: MSW (Mock Service Worker)
E2E测试: Playwright
```

### 后端测试
```yaml
单元测试: Jest + Supertest
数据库测试: Jest + 测试数据库
API测试: Postman/Newman + OpenAPI
性能测试: Artillery.js
```

## Agent协作

**上游输入**:
- ← product-manager.md (验收标准)
- ← architect.md (技术测试要求)
- ← ui-designer.md (用户流程测试)
- ← frontend-developer.md (组件测试)
- ← backend-developer.md (API测试)

**输出验证**: 对所有Agent输出进行测试覆盖验证

## 质量门禁

### 代码提交门禁
- ✅ 单元测试通过率100%
- ✅ 代码覆盖率≥80%
- ✅ 静态代码检查通过
- ✅ 类型检查无错误

### 集成部署门禁
- ✅ 集成测试通过率100%
- ✅ API契约测试通过
- ✅ 安全扫描通过
- ✅ 性能基准测试通过

### 发布上线门禁
- ✅ E2E测试通过率100%
- ✅ 用户接受度测试通过
- ✅ 生产环境冒烟测试通过
- ✅ 回滚方案验证通过

## 示例用法

```bash
# 基于完整规范生成测试计划
/ut:generate/test

# 专注性能测试
/ut:generate/test "performance-focused"

# 包含安全测试
/ut:generate/test "security-testing"
```

## 最佳实践

1. **测试先行**: 先写测试，再写实现代码
2. **持续集成**: 自动化测试在CI/CD管道中执行
3. **测试隔离**: 每个测试用例独立，不相互依赖
4. **数据驱动**: 使用测试数据驱动多种场景验证
5. **快速反馈**: 单元测试快速执行，及时发现问题