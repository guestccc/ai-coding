# /ut:validate/api

**命令描述**: 验证OpenAPI规范正确性和API契约一致性
**交互消耗**: 🟢 低消耗 (1-2次)
**激活Agent**: architect.md + backend-developer.md

## 命令用法

```bash
/ut:validate/api [验证API规范和实现一致性]
```

## 前置依赖

- ✅ 必须存在: `docs/openapi.yaml`
- 📋 建议存在: 后端代码实现, 前端API调用代码

## 执行流程

### 1. OpenAPI规范验证
```yaml
语法验证:
  - ✅ YAML格式正确性
  - ✅ OpenAPI 3.0.3规范符合性
  - ✅ Schema定义完整性
  - ✅ 循环引用检查

结构验证:
  - ✅ 必需字段completeness
  - ✅ 路径参数一致性
  - ✅ HTTP方法规范性
  - ✅ 响应状态码合理性
```

### 2. RESTful设计验证
```yaml
路径设计:
  - ✅ 资源导向URL设计
  - ✅ 层次结构清晰
  - ✅ 命名约定一致
  - ✅ 版本管理规范

HTTP方法使用:
  - ✅ GET用于数据查询
  - ✅ POST用于资源创建
  - ✅ PUT用于资源更新
  - ✅ DELETE用于资源删除
  - ✅ 幂等性正确实现

状态码规范:
  - ✅ 2xx成功响应
  - ✅ 4xx客户端错误
  - ✅ 5xx服务器错误
  - ✅ 状态码语义正确
```

### 3. 数据模型验证
```yaml
Schema定义:
  - ✅ 数据类型定义正确
  - ✅ 必填字段标记
  - ✅ 字段格式验证
  - ✅ 枚举值定义

关系模型:
  - ✅ 外键关联正确
  - ✅ 一对多关系处理
  - ✅ 多对多关系设计
  - ✅ 嵌套对象结构

验证规则:
  - ✅ 数据长度限制
  - ✅ 正则表达式验证
  - ✅ 数值范围约束
  - ✅ 日期格式规范
```

### 4. 安全性验证
```yaml
认证机制:
  - ✅ JWT Bearer Token配置
  - ✅ 安全Scheme定义
  - ✅ 权限控制规范

输入验证:
  - ✅ 参数验证规则
  - ✅ 防注入攻击
  - ✅ 文件上传限制
  - ✅ 敏感数据保护

错误处理:
  - ✅ 错误信息不泄露敏感信息
  - ✅ 统一错误格式
  - ✅ 错误码体系完整
```

## 契约一致性验证

### 前后端契约匹配
如果存在前后端代码，验证实现与规范一致性：

```yaml
后端实现验证:
  路由匹配:
    - ✅ 路径定义一致
    - ✅ HTTP方法匹配
    - ✅ 参数类型正确
    
  响应格式:
    - ✅ 响应Schema匹配
    - ✅ 状态码使用正确
    - ✅ 错误格式统一

前端调用验证:
  API调用:
    - ✅ 请求格式正确
    - ✅ 参数传递匹配
    - ✅ 响应处理一致
    
  类型定义:
    - ✅ TypeScript类型匹配
    - ✅ 接口定义一致
    - ✅ 可选参数处理
```

## 验证工具集成

### 自动化验证工具
```yaml
OpenAPI工具:
  - Swagger Validator: 规范合规性检查
  - OpenAPI Generator: 代码生成验证
  - Spectral: 自定义规则验证
  
契约测试:
  - Pact: 消费者驱动契约测试
  - Postman: API功能测试
  - Newman: 自动化API测试
```

### 验证脚本示例
```javascript
// scripts/validate-api.js
const SwaggerParser = require('@apidevtools/swagger-parser')
const { Spectral } = require('@stoplight/spectral-core')
const fs = require('fs')

async function validateOpenAPI() {
  try {
    // 1. 解析和验证OpenAPI文件
    const api = await SwaggerParser.validate('./docs/openapi.yaml')
    console.log('✅ OpenAPI规范验证通过')
    
    // 2. 自定义规则验证
    const spectral = new Spectral()
    await spectral.loadRuleset('./validation/api-rules.yml')
    
    const results = await spectral.run(api)
    
    if (results.length === 0) {
      console.log('✅ 自定义规则验证通过')
    } else {
      console.log('⚠️ 发现以下问题:')
      results.forEach(result => {
        console.log(`- ${result.severity}: ${result.message}`)
      })
    }
    
    return results.length === 0
    
  } catch (error) {
    console.error('❌ API验证失败:', error.message)
    return false
  }
}

// 3. 契约一致性验证
async function validateContract() {
  const openapi = require('./docs/openapi.yaml')
  const backendRoutes = require('./src/backend/routes')
  
  const issues = []
  
  // 检查后端路由是否实现了所有API端点
  for (const [path, methods] of Object.entries(openapi.paths)) {
    for (const method of Object.keys(methods)) {
      if (!backendRoutes.hasRoute(method, path)) {
        issues.push(`缺少实现: ${method.toUpperCase()} ${path}`)
      }
    }
  }
  
  return issues
}

module.exports = { validateOpenAPI, validateContract }
```

## 验证报告生成

### API验证报告模板
```yaml
# API规范验证报告

## 验证概览
- 验证时间: 2024-01-15 14:30:00
- OpenAPI版本: 3.0.3
- API端点数量: 25个
- 数据模型数量: 12个
- 验证状态: ✅ 通过

## 规范验证结果

### 语法和结构 (100%)
- ✅ YAML格式正确
- ✅ OpenAPI 3.0.3规范符合
- ✅ Schema定义完整
- ✅ 无循环引用

### RESTful设计 (95%)
- ✅ 资源导向设计 (24/25)
- ⚠️ 部分路径命名不一致 (1处)
- ✅ HTTP方法使用正确
- ✅ 状态码规范使用

### 数据模型 (98%)
- ✅ Schema定义完整
- ✅ 类型定义正确
- ⚠️ 缺少部分字段验证规则 (2个字段)
- ✅ 关系模型清晰

### 安全性 (100%)
- ✅ JWT认证配置正确
- ✅ 权限控制完整
- ✅ 输入验证规则完善
- ✅ 错误处理安全

## 契约一致性验证

### 后端实现匹配 (100%)
- ✅ 所有端点已实现 (25/25)
- ✅ 响应格式匹配
- ✅ 错误处理一致

### 前端调用匹配 (100%)
- ✅ API调用格式正确
- ✅ TypeScript类型匹配
- ✅ 错误处理完整

## 发现问题

### 警告级别
1. `/api/v1/user-profiles` 路径命名建议改为 `/api/v1/user/profiles`
2. `User.phoneNumber` 字段缺少格式验证规则
3. `Post.tags` 字段缺少长度限制

### 建议优化
1. 统一命名约定，使用kebab-case
2. 添加所有输入字段的验证规则
3. 考虑添加API使用限制和缓存策略

## 质量评分
- 规范符合性: 98/100
- 设计一致性: 95/100
- 安全性: 100/100
- 契约匹配度: 100/100
- 整体质量: 98.25/100
```

## 输出文件

**主要输出**: `project/validation/api-validation-report.md`
**次要输出**: 
- `project/validation/api-issues.json` - 问题详情JSON
- `project/validation/contract-diff.json` - 契约差异报告

## 自动修复建议

### 常见问题修复
```yaml
命名规范问题:
  - 自动检测不一致命名
  - 提供标准化建议
  - 生成批量修复脚本

验证规则缺失:
  - 识别缺少验证的字段
  - 根据字段类型推荐验证规则
  - 生成完整Schema定义

契约不匹配:
  - 对比规范与实现差异
  - 生成缺失端点提醒
  - 提供实现代码模板
```

## Agent协作

**上游输入**: 
- ← architect.md (API设计规范)
- ← backend-developer.md (实现验证)

**下游输出**:
- → 修复建议和代码模板

## 质量标准

- ✅ OpenAPI 3.0.3规范100%符合
- ✅ RESTful设计原则遵循≥95%
- ✅ 安全性检查100%通过
- ✅ 契约一致性≥98%匹配
- ✅ 自动生成详细验证报告
- ✅ 提供可执行的修复方案

## 示例用法

```bash
# 验证OpenAPI规范
/ut:validate/api

# 包含契约一致性检查
/ut:validate/api "contract-check"

# 生成详细诊断报告
/ut:validate/api "detailed-report"
```

## 最佳实践

1. **持续验证**: 每次API修改后自动验证
2. **规范先行**: 先定义规范，再实现代码
3. **工具集成**: 集成到CI/CD管道自动检查
4. **团队共识**: 建立团队API设计规范
5. **文档同步**: 保持文档与实现同步更新