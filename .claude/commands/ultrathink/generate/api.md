# /ut:generate/api

**命令描述**: 调用架构师Agent生成OpenAPI 3.0规范文档
**交互消耗**: 🟡 中消耗 (2-3次)
**激活Agent**: architect.md + backend-developer.md

## 命令用法

```bash
/ut:generate/api [基于架构设计]
```

## 前置依赖

- ✅ 必须存在: `docs/PRD.md`, `docs/architecture.md`
- 📋 建议存在: `project/context/tech-decisions.md`

## 执行流程

### 1. 需求分析阶段
- **输入**: @docs/PRD.md + @docs/architecture.md
- **处理**: 提取API需求、数据模型、业务流程
- **输出**: API需求清单

### 2. RESTful设计阶段
遵循RESTful设计原则：
```yaml
资源识别: 核心业务实体 → URL资源路径
HTTP方法: GET(查询) POST(创建) PUT(更新) DELETE(删除)
状态码: 2xx(成功) 4xx(客户端错误) 5xx(服务端错误)
统一响应: {success: boolean, data: any, message: string}
```

### 3. OpenAPI规范生成
标准OpenAPI 3.0结构：
```yaml
openapi: 3.0.3
info: 项目基本信息
servers: 服务器配置
paths: API路径定义
components: 复用组件(schemas, responses, parameters)
security: 认证方案
tags: API分组标签
```

### 4. 数据模型设计
- **Schema定义**: 实体模型和关系
- **验证规则**: 数据类型、必填字段、格式验证
- **错误处理**: 标准化错误码和错误信息

## 输出文件

**主要输出**: `docs/openapi.yaml`
```yaml
OpenAPI规范内容:
  - API信息和版本
  - 服务器配置
  - 认证方案 (JWT Bearer)
  - 路径和操作定义
  - 数据模型Schema
  - 响应格式规范
  - 错误码定义
```

**次要输出**:
- `docs/api-design.md` - API设计说明文档
- `project/context/api-contracts.md` - API契约定义

## API设计模式

### 标准CRUD模式
```yaml
GET    /api/v1/{resource}         # 获取资源列表
POST   /api/v1/{resource}         # 创建新资源  
GET    /api/v1/{resource}/{id}    # 获取单个资源
PUT    /api/v1/{resource}/{id}    # 更新资源
DELETE /api/v1/{resource}/{id}    # 删除资源
```

### 复杂操作模式
```yaml
POST   /api/v1/{resource}/{id}/actions/{action}  # 业务操作
GET    /api/v1/{resource}/search?q={query}       # 搜索查询
POST   /api/v1/{resource}/batch                  # 批量操作
```

### 分页和过滤
```yaml
查询参数:
  page: 页码 (默认1)
  limit: 每页数量 (默认20)
  sort: 排序字段
  order: 排序方向 (asc/desc)
  filter: 过滤条件
```

## Agent协作

**上游输入**:
- ← architect.md (技术架构)
- ← product-manager.md (功能需求)

**下游输出**:
- → backend-developer.md (API实现规范)
- → frontend-developer.md (API调用规范)
- → integration.md (API测试规范)

## 质量标准

- ✅ 遵循OpenAPI 3.0规范
- ✅ 所有API都有完整的请求/响应定义
- ✅ 数据模型有详细的Schema定义
- ✅ 错误处理有统一的错误码体系
- ✅ 认证授权机制清晰
- ✅ API版本管理策略明确

## 验证检查

生成后自动执行验证：
- **语法检查**: YAML格式正确性
- **规范检查**: OpenAPI 3.0规范符合性
- **完整性检查**: 所有业务功能API覆盖
- **一致性检查**: 与PRD和架构文档一致

## 示例用法

```bash
# 基于现有架构生成API
/ut:generate/api

# 指定API版本
/ut:generate/api "v2.0"

# 包含特定功能
/ut:generate/api "用户管理+订单系统"
```

## 最佳实践

1. **资源导向设计**: URL表示资源，HTTP方法表示操作
2. **幂等性设计**: GET/PUT/DELETE操作保持幂等
3. **版本管理**: 通过URL路径管理API版本
4. **错误处理**: 提供清晰的错误信息和调试信息
5. **文档完整**: 每个API都有使用示例和错误码说明