# /ut:validate/specs

**命令描述**: 多Agent交叉验证项目规格文档质量
**交互消耗**: 🟢 低消耗 (1-2次)
**激活Agent**: 所有相关Agent

## 命令用法

```bash
/ut:validate/specs [验证所有规格文档]
```

## 前置依赖

- ✅ 至少存在: `docs/PRD.md`
- 📋 建议存在: `docs/architecture.md`, `docs/openapi.yaml`, `docs/prototype.md`

## 执行流程

### 1. 文档存在性检查
```yaml
必需文档检查:
  - docs/PRD.md (产品需求文档)
  - docs/architecture.md (技术架构文档)
  - docs/openapi.yaml (API规范文档)

可选文档检查:
  - docs/prototype.md (原型设计文档)
  - docs/test-plan.md (测试计划文档)
  - docs/design-system.md (设计系统文档)
```

### 2. Agent专业验证
每个Agent验证其专业领域文档：

#### 产品经理Agent验证PRD
```yaml
验证维度:
  需求完整性:
    - ✅ 所有P0功能有明确验收标准
    - ✅ 用户故事符合INVEST原则
    - ✅ 非功能性需求已量化
    
  需求质量:
    - ✅ EARS语法规范符合性
    - ✅ 需求无歧义和冲突
    - ✅ 技术可行性评估合理
    
  文档结构:
    - ✅ 章节结构完整
    - ✅ 目标用户清晰
    - ✅ 验收标准明确
```

#### 架构师Agent验证架构和API
```yaml
验证维度:
  技术架构:
    - ✅ 技术选型有评估依据
    - ✅ 架构图清晰展示组件关系
    - ✅ 非功能性需求有具体指标
    
  API规范:
    - ✅ 遵循OpenAPI 3.0规范
    - ✅ RESTful设计原则符合
    - ✅ 错误处理统一规范
    - ✅ 认证授权机制清晰
    
  数据设计:
    - ✅ 数据库设计符合3NF
    - ✅ 索引设计合理
    - ✅ 关联关系正确
```

#### UI设计师Agent验证原型
```yaml
验证维度:
  设计系统:
    - ✅ 色彩系统完整一致
    - ✅ 字体系统层次清晰
    - ✅ 间距系统规范化
    
  用户体验:
    - ✅ 用户流程逻辑清晰
    - ✅ 交互行为定义明确
    - ✅ 响应式设计覆盖全端
    
  组件规范:
    - ✅ 组件库规范完整
    - ✅ 状态和交互定义清晰
    - ✅ 无障碍性设计考虑
```

#### 集成测试Agent验证测试计划
```yaml
验证维度:
  测试覆盖:
    - ✅ P0功能100%覆盖
    - ✅ 测试金字塔比例合理
    - ✅ 异常场景测试完整
    
  测试策略:
    - ✅ TDD实施计划清晰
    - ✅ 测试环境配置完整
    - ✅ 测试数据管理策略
    
  质量标准:
    - ✅ 覆盖率指标明确
    - ✅ 性能测试基准设定
    - ✅ 自动化测试比例合理
```

### 3. 跨文档一致性验证
```yaml
PRD ↔ 架构文档:
  - ✅ 功能需求与技术实现匹配
  - ✅ 性能要求与架构设计一致
  - ✅ 技术约束在架构中体现

架构 ↔ API规范:
  - ✅ API设计符合架构约束
  - ✅ 数据模型与API Schema一致
  - ✅ 认证方案与架构设计匹配

PRD ↔ 原型设计:
  - ✅ 用户故事与原型流程对应
  - ✅ 功能需求在原型中体现
  - ✅ 用户角色与界面权限匹配

全文档 ↔ 测试计划:
  - ✅ 测试用例覆盖所有需求
  - ✅ 测试环境与架构设计匹配
  - ✅ 验收标准与测试断言一致
```

## 验证报告生成

### 验证报告模板
```yaml
# 规格文档验证报告

## 验证概览
- 验证时间: 2024-01-15 14:30:00
- 文档数量: 4个
- 验证Agent: 6个
- 总体状态: ✅ 通过 / ⚠️ 警告 / ❌ 失败

## 分项验证结果

### PRD文档验证 (product-manager Agent)
状态: ✅ 通过
检查项: 15/15 通过
问题: 无

### 架构文档验证 (architect Agent)  
状态: ⚠️ 警告
检查项: 12/15 通过
问题:
  - ⚠️ 缺少缓存策略设计
  - ⚠️ 数据库索引设计不完整
  - ⚠️ 监控方案未明确

### API规范验证 (architect + backend-developer Agent)
状态: ✅ 通过
检查项: 20/20 通过
问题: 无

### 原型设计验证 (ui-designer Agent)
状态: ✅ 通过  
检查项: 18/18 通过
问题: 无

## 跨文档一致性验证
状态: ✅ 通过
检查项: 25/25 通过

## 建议修复项
1. [P1] 补充架构文档中的缓存策略设计
2. [P2] 完善数据库索引优化方案
3. [P2] 明确监控和告警方案

## 质量评分
- 需求质量: 95/100
- 架构质量: 85/100  
- API质量: 98/100
- 设计质量: 92/100
- 整体质量: 92.5/100
```

## 输出文件

**主要输出**: `project/validation/specs-validation-report.md`
**次要输出**: 
- `project/validation/prd-validation.json` - PRD验证详情
- `project/validation/architecture-validation.json` - 架构验证详情
- `project/validation/api-validation.json` - API验证详情
- `project/validation/prototype-validation.json` - 原型验证详情

## 自动修复建议

### 智能修复推荐
```yaml
常见问题自动识别:
  需求缺失: 自动生成缺失需求模板
  架构不一致: 提供架构对齐建议
  API不规范: 生成标准API模式
  设计不完整: 补充设计系统缺失项

修复优先级:
  P0: 阻塞性问题，必须修复
  P1: 重要问题，建议修复
  P2: 优化建议，可选修复
```

## 验证配置

### 验证规则配置
```yaml
# .ultrathink/validation-rules.yml
validation_rules:
  prd:
    required_sections: [概述, 用户画像, 功能需求, 验收标准]
    min_p0_features: 3
    ears_compliance: true
    
  architecture:
    required_diagrams: [系统架构图, 数据库ER图]
    tech_stack_justification: true
    performance_metrics: true
    
  api:
    openapi_version: "3.0.3"
    restful_compliance: true
    error_handling_standard: true
    
  prototype:
    design_system_complete: true
    responsive_breakpoints: [mobile, tablet, desktop]
    accessibility_level: "AA"
```

## Agent协作

**输入来源**: 所有已生成的规格文档
**输出目标**: 各专业Agent提供修复建议
**协作模式**: 并行验证 + 交叉检查

## 质量标准

- ✅ 每个文档都有对应Agent验证
- ✅ 跨文档一致性100%检查
- ✅ 自动生成详细验证报告
- ✅ 提供可执行的修复建议
- ✅ 验证规则可配置和扩展

## 示例用法

```bash
# 验证所有规格文档
/ut:validate/specs

# 仅验证特定文档
/ut:validate/specs "prd,architecture"

# 包含详细诊断
/ut:validate/specs "detailed"
```

## 最佳实践

1. **定期验证**: 每次文档更新后自动验证
2. **修复跟踪**: 记录问题修复历史和状态
3. **规则演进**: 根据项目经验优化验证规则
4. **团队协作**: 验证结果供团队review使用