# API一致性检查报告模板

## 报告概述
- **生成时间**: {{timestamp}}
- **检查范围**: PRD页面API vs OpenAPI规范
- **检查版本**: PRD v{{prd_version}}, API v{{api_version}}

## 检查统计

### 总体匹配情况
```yaml
总页面数量: {{total_pages}}
总API组件数量: {{total_components}}
匹配成功的API: {{matched_apis}} ({{matched_percentage}}%)
不匹配的API: {{mismatched_apis}}
缺失的API: {{missing_apis}}
```

### 按页面分类统计
| 页面类型 | 页面数量 | API组件数 | 匹配数 | 不匹配数 | 缺失数 | 匹配率 |
|---------|---------|----------|--------|----------|--------|--------|
| 入口页面 | {{entry_pages}} | {{entry_components}} | {{entry_matched}} | {{entry_mismatched}} | {{entry_missing}} | {{entry_rate}}% |
| 一级页面 | {{primary_pages}} | {{primary_components}} | {{primary_matched}} | {{primary_mismatched}} | {{primary_missing}} | {{primary_rate}}% |
| 二级页面 | {{secondary_pages}} | {{secondary_components}} | {{secondary_matched}} | {{secondary_mismatched}} | {{secondary_missing}} | {{secondary_rate}}% |
| 三级页面 | {{tertiary_pages}} | {{tertiary_components}} | {{tertiary_matched}} | {{tertiary_mismatched}} | {{tertiary_missing}} | {{tertiary_rate}}% |

## 详细检查结果

### ✅ 匹配成功的API接口

#### 入口页面
```yaml
{{#entry_matched_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  API: {{http_method}} {{api_path}}
  状态: ✅ 完全匹配
{{/entry_matched_list}}
```

#### 一级页面
```yaml
{{#primary_matched_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  API: {{http_method}} {{api_path}}
  状态: ✅ 完全匹配
{{/primary_matched_list}}
```

#### 二级页面
```yaml
{{#secondary_matched_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  API: {{http_method}} {{api_path}}
  状态: ✅ 完全匹配
{{/secondary_matched_list}}
```

#### 三级页面
```yaml
{{#tertiary_matched_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  API: {{http_method}} {{api_path}}
  状态: ✅ 完全匹配
{{/tertiary_matched_list}}
```

### ⚠️ 不匹配的API接口

```yaml
{{#mismatched_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  PRD标注API: {{prd_method}} {{prd_path}}
  OpenAPI定义: {{api_method}} {{api_path}}
  不匹配类型: {{mismatch_type}}
  问题描述: {{issue_description}}
  修复建议: {{fix_suggestion}}
{{/mismatched_list}}
```

### ❌ 缺失的API接口

```yaml
{{#missing_list}}
- 页面: {{page_name}} [{{page_path}}]
  组件: {{component_name}}
  PRD标注API: {{prd_method}} {{prd_path}}
  状态: ❌ 在OpenAPI规范中未找到
  严重程度: {{severity}}
  影响范围: {{impact}}
  修复优先级: {{priority}}
  建议方案: {{suggestion}}
{{/missing_list}}
```

## 一致性检查规则

### 检查维度
1. **路径存在性**: PRD中标注的API路径必须在OpenAPI规范中存在
2. **方法一致性**: HTTP方法必须完全匹配
3. **参数完整性**: 请求参数必须符合OpenAPI规范定义
4. **响应格式**: 响应数据结构必须匹配Schema定义
5. **错误处理**: 错误码和错误信息必须一致

### 严重程度分级
- 🔴 **严重**: 核心功能API缺失或不匹配
- 🟡 **警告**: 次要功能API问题
- 🔵 **提示**: 建议性改进

## 修复建议

### 立即修复 (优先级: 高)
```yaml
{{#high_priority_fixes}}
- 问题: {{issue}}
  影响: {{impact}}
  解决方案: {{solution}}
  预计工时: {{estimated_time}}
{{/high_priority_fixes}}
```

### 计划修复 (优先级: 中)
```yaml
{{#medium_priority_fixes}}
- 问题: {{issue}}
  影响: {{impact}}
  解决方案: {{solution}}
  预计工时: {{estimated_time}}
{{/medium_priority_fixes}}
```

### 优化改进 (优先级: 低)
```yaml
{{#low_priority_fixes}}
- 问题: {{issue}}
  影响: {{impact}}
  解决方案: {{solution}}
  预计工时: {{estimated_time}}
{{/low_priority_fixes}}
```

## 后续行动

### 短期行动 (1-3天)
1. 修复严重级别的不匹配问题
2. 补充缺失的核心功能API
3. 更新PRD文档中的API描述

### 中期行动 (1-2周)
1. 完善所有API的详细定义
2. 建立API版本管理机制
3. 实施自动化API测试

### 长期行动 (1个月以上)
1. 建立API治理流程
2. 实现持续集成中的API一致性检查
3. 建立API文档自动化生成流水线

## 附录

### 检查工具配置
```yaml
检查工具: UltraThink API一致性检查器
版本: v1.0.0
检查规则版本: v1.2.0
支持的检查类型:
  - 路径匹配检查
  - 方法验证
  - 参数校验
  - 响应格式验证
  - 错误处理检查
```

### 相关文档链接
- [PRD文档](docs/PRD.md)
- [OpenAPI规范](docs/openapi.yaml)
- [API设计文档](docs/api-design.md)
- [架构设计文档](docs/architecture.md)

---
*本报告由UltraThink API一致性检查器自动生成*
*报告版本: v1.0.0 | 生成时间: {{timestamp}}*