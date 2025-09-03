# /ut:validate/coverage

**命令描述**: 检查测试覆盖率和功能实现完整性
**交互消耗**: 🟢 低消耗 (1-2次)
**激活Agent**: integration.md

## 命令用法

```bash
/ut:validate/coverage [检查测试覆盖率和实现完整性]
```

## 前置依赖

- ✅ 建议存在: 前端代码、后端代码、测试用例
- 📋 必需存在: `docs/PRD.md`

## 执行流程

### 1. 功能实现完整性检查
```yaml
需求追踪矩阵:
  - PRD需求 → 代码实现映射
  - 用户故事 → 功能模块对应
  - 验收标准 → 测试用例覆盖
  
实现状态统计:
  - ✅ 已实现功能数量/比例
  - 🚧 部分实现功能数量/比例  
  - ❌ 未实现功能数量/比例
  - 📋 计划外功能数量/比例
```

### 2. 代码覆盖率分析
如果存在测试代码，执行覆盖率检查：

```yaml
前端覆盖率:
  - 语句覆盖率 (Statement Coverage)
  - 分支覆盖率 (Branch Coverage)
  - 函数覆盖率 (Function Coverage)
  - 行覆盖率 (Line Coverage)

后端覆盖率:
  - 单元测试覆盖率
  - 集成测试覆盖率
  - API端点覆盖率
  - 业务逻辑覆盖率

覆盖率目标:
  - 单元测试: ≥80%
  - 核心业务: ≥95%
  - API端点: 100%
  - 错误处理: ≥90%
```

### 3. API端点覆盖率
```yaml
API实现覆盖:
  - OpenAPI定义 → 后端实现
  - 后端实现 → 前端调用
  - 前端调用 → 测试用例
  
端点状态分类:
  - ✅ 完整实现: 后端+前端+测试
  - ⚠️ 部分实现: 缺少前端或测试
  - ❌ 未实现: 仅有OpenAPI定义
  - 🔄 测试中: 实现但测试不完整
```

### 4. 测试用例覆盖率
```yaml
功能测试覆盖:
  - P0功能: 100%端到端测试
  - P1功能: 100%集成测试
  - P2功能: 80%单元测试
  
场景测试覆盖:
  - 正常流程: 100%覆盖
  - 异常处理: 90%覆盖
  - 边界条件: 80%覆盖
  - 性能场景: 关键路径100%

测试类型分布:
  - 单元测试: 70%
  - 集成测试: 20%
  - 端到端测试: 10%
```

## 覆盖率检测工具

### 前端覆盖率工具
```bash
# Jest + Istanbul
npm run test:coverage

# Vitest覆盖率
npm run test:coverage -- --reporter=html

# Playwright测试覆盖率  
npx playwright test --reporter=html
```

### 后端覆盖率工具
```bash
# Jest覆盖率
npm run test -- --coverage

# c8 (V8 coverage)
npx c8 npm test

# Istanbul/nyc
npx nyc npm test
```

### 覆盖率配置示例
```json
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // 核心业务模块要求更高覆盖率
    './src/services/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}'
  ]
}
```

## 覆盖率分析报告

### 需求实现追踪矩阵
```yaml
# 功能实现覆盖率报告

## 实现概览
- 验证时间: 2024-01-15 14:30:00
- 总需求数: 45个
- 已实现: 38个 (84.4%)
- 部分实现: 5个 (11.1%)
- 未实现: 2个 (4.4%)

## P0核心功能实现 (95.0%)
✅ 用户注册登录 - 完整实现
✅ 用户信息管理 - 完整实现  
✅ 数据列表展示 - 完整实现
✅ 数据搜索过滤 - 完整实现
🚧 数据批量操作 - 后端实现，前端开发中
✅ 权限管理 - 完整实现

## P1重要功能实现 (80.0%)
✅ 数据导出功能 - 完整实现
✅ 操作日志记录 - 完整实现
🚧 邮件通知 - 后端实现，前端待集成
🚧 数据统计分析 - 基础实现，高级功能待开发
❌ 移动端适配 - 计划下版本

## P2扩展功能实现 (60.0%)
✅ 深色主题 - 完整实现
🚧 多语言支持 - 框架搭建，翻译待完成
❌ API限流 - 计划实现
🚧 缓存优化 - 部分实现
```

### 代码覆盖率报告
```yaml
## 代码覆盖率统计

### 前端覆盖率 (85.2%)
- 语句覆盖率: 87.3% (1,245/1,425)
- 分支覆盖率: 82.1% (234/285)  
- 函数覆盖率: 89.7% (156/174)
- 行覆盖率: 86.8% (1,198/1,380)

#### 覆盖率分布
- src/components/: 92.1% (高覆盖率)
- src/pages/: 78.4% (需提升)
- src/hooks/: 95.3% (优秀)
- src/utils/: 88.7% (良好)

#### 低覆盖率文件 (<80%)
- src/pages/AdminPanel.tsx: 65.2%
- src/utils/dateHelpers.ts: 72.8%
- src/components/Charts.tsx: 76.1%

### 后端覆盖率 (91.7%)
- 语句覆盖率: 93.2% (2,145/2,301)
- 分支覆盖率: 89.4% (412/461)
- 函数覆盖率: 94.1% (287/305)
- 行覆盖率: 92.6% (2,087/2,253)

#### 覆盖率分布
- src/controllers/: 89.2% (良好)
- src/services/: 96.8% (优秀)
- src/middleware/: 85.3% (需提升)
- src/utils/: 94.7% (优秀)
```

### API端点覆盖率
```yaml
## API实现和测试覆盖率

### 端点实现覆盖率 (96.0%)
- 已定义端点: 25个
- 已实现端点: 24个 (96.0%)
- 前端集成: 23个 (92.0%)
- 测试覆盖: 22个 (88.0%)

### 分类统计
用户管理 API (100%):
  ✅ POST /api/v1/auth/login - 实现+集成+测试
  ✅ POST /api/v1/auth/register - 实现+集成+测试
  ✅ GET /api/v1/users - 实现+集成+测试
  ✅ PUT /api/v1/users/:id - 实现+集成+测试

数据管理 API (90%):
  ✅ GET /api/v1/data - 实现+集成+测试
  ✅ POST /api/v1/data - 实现+集成+测试
  ⚠️ PUT /api/v1/data/:id - 实现+集成，测试待完成
  ❌ DELETE /api/v1/data/batch - 仅定义，未实现

### 未覆盖端点
- DELETE /api/v1/data/batch - 批量删除功能待实现
```

## 输出文件

**主要输出**: `project/validation/coverage-report.md`
**次要输出**: 
- `coverage/lcov-report/index.html` - HTML覆盖率报告
- `project/validation/feature-matrix.json` - 需求追踪矩阵
- `project/validation/api-coverage.json` - API覆盖率详情

## 覆盖率优化建议

### 自动化改进建议
```yaml
低覆盖率改进:
  识别逻辑:
    - 覆盖率<80%的文件/函数
    - 未测试的分支路径
    - 错误处理代码覆盖不足
    
  改进方案:
    - 生成缺失测试用例模板
    - 识别边界条件测试机会
    - 提供Mock数据和测试工具

功能实现跟踪:
  - 自动匹配PRD需求与代码实现
  - 识别功能实现gaps
  - 生成待实现功能清单
```

### 质量门禁设置
```yaml
提交门禁:
  - 新增代码覆盖率≥80%
  - 不降低整体覆盖率
  - P0功能必须有测试

合并门禁:
  - 整体覆盖率≥80%
  - 核心功能覆盖率≥95%
  - API端点100%实现

发布门禁:
  - P0功能100%实现且测试
  - 整体覆盖率≥85%
  - 端到端测试100%通过
```

## Agent协作

**上游输入**: 
- ← 所有生成的代码和测试
- ← PRD需求定义

**输出目标**: 覆盖率改进建议和实现计划

## 质量标准

- ✅ P0功能100%实现和测试
- ✅ 整体代码覆盖率≥80%
- ✅ 核心业务覆盖率≥95%
- ✅ API端点100%实现覆盖
- ✅ 自动生成改进建议
- ✅ 提供质量门禁配置

## 示例用法

```bash
# 完整覆盖率检查
/ut:validate/coverage

# 仅检查功能实现覆盖
/ut:validate/coverage "feature-only"

# 包含改进建议
/ut:validate/coverage "with-suggestions"
```

## 最佳实践

1. **持续监控**: 每次构建自动生成覆盖率报告
2. **增量改进**: 重点提升低覆盖率模块
3. **质量门禁**: 设置覆盖率阈值防止回退
4. **可视化报告**: 使用HTML报告直观展示覆盖情况
5. **团队共识**: 建立团队覆盖率标准和改进流程