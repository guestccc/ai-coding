# UltraThink行为模式系统 v1.2.0

智能行为模式系统，根据不同开发场景和时间约束自动调整AI行为策略。

## 核心设计理念

### 上下文感知行为调节
```yaml
自适应策略:
  时间约束感知: 根据剩余交互次数调整详细程度
  任务复杂度感知: 根据任务类型选择处理深度
  质量要求感知: 根据项目阶段调整质量标准
  风险评估感知: 根据决策重要性调整验证程度
```

### 4种核心行为模式

```yaml
Rush模式 (冲刺模式):
  场景: 时间紧迫，需要快速完成基本功能
  策略: 最小可用产品(MVP)优先，简化流程
  适用: 剩余交互<6次，或明确要求快速交付
  
Standard模式 (标准模式):  
  场景: 正常开发节奏，平衡质量和效率
  策略: 完整开发流程，标准质量检查
  适用: 剩余交互6-15次，常规开发需求
  
Deep模式 (深度模式):
  场景: 复杂问题需要深入分析和优化
  策略: 详细设计，多轮验证，最佳实践
  适用: 剩余交互>15次，高质量要求项目
  
Learning模式 (学习模式):
  场景: 探索新技术或实验性开发
  策略: 详细解释，步骤拆解，知识传授
  适用: 教学场景，技术探索，概念验证
```

## 模式自动切换机制

### 智能激活触发
```yaml
时间驱动切换:
  剩余交互 ≤ 5次 → 自动建议Rush模式
  剩余交互 6-15次 → 默认Standard模式
  剩余交互 ≥ 16次 → 可选择Deep模式

任务驱动切换:
  快速原型 → Rush模式
  生产系统 → Standard模式  
  架构设计 → Deep模式
  学习项目 → Learning模式

质量驱动切换:
  MVP需求 → Rush模式
  商业项目 → Standard模式
  企业级项目 → Deep模式
  教学演示 → Learning模式
```

### 用户主动切换
```yaml
切换命令:
  /ut:mode/rush - 切换到冲刺模式
  /ut:mode/standard - 切换到标准模式
  /ut:mode/deep - 切换到深度模式
  /ut:mode/learning - 切换到学习模式
  /ut:mode/auto - 恢复自动模式选择
```

## 模式行为差异对比

### 代码生成行为差异
```yaml
Rush模式:
  - 基础功能实现，最小可用
  - 简化错误处理
  - 基本测试覆盖(60%)
  - 快速原型风格代码

Standard模式:
  - 完整功能实现
  - 全面错误处理
  - 标准测试覆盖(80%)
  - 生产就绪代码

Deep模式:
  - 优化的实现方案
  - 详细错误处理和日志
  - 高测试覆盖率(90%+)
  - 最佳实践和性能优化

Learning模式:
  - 详细注释和解释
  - 多种实现方案对比
  - 完整测试用例和文档
  - 教学导向的代码结构
```

### 文档生成行为差异
```yaml
Rush模式:
  - 简化版PRD，核心功能优先
  - 基础架构设计
  - 简化API规范
  - 最小化文档集合

Standard模式:
  - 完整PRD文档
  - 详细架构设计
  - 完整API规范和示例
  - 标准文档模板

Deep模式:
  - 深度需求分析
  - 多方案架构对比
  - 详细API设计和最佳实践
  - 完整文档体系+质量检查

Learning模式:
  - 教学式PRD编写过程
  - 架构设计原理解释
  - API设计模式讲解
  - 知识传授导向文档
```

## 模式配置参数

### Rush模式配置
```yaml
# modes/rush.yml
mode_name: "Rush (冲刺模式)"
description: "快速MVP开发，时间优先"
target_scenario: "时间紧迫的快速原型开发"

parameters:
  max_iterations_per_task: 2
  code_completeness: "60%"
  test_coverage_target: "60%"
  documentation_level: "minimal"
  error_handling_depth: "basic"
  
behavior_adjustments:
  skip_advanced_features: true
  prioritize_p0_only: true
  minimize_refactoring: true
  use_simple_patterns: true
  
output_style:
  explanation_verbosity: "low"
  code_comments: "essential_only"
  example_quantity: "minimal"
  alternative_solutions: false

time_management:
  estimated_interactions_per_phase:
    requirements: 1
    design: 1  
    development: 2-3
    testing: 1
  
quality_gates:
  skip_non_critical: true
  focus_on_functionality: true
```

### Deep模式配置
```yaml  
# modes/deep.yml
mode_name: "Deep (深度模式)"
description: "深度分析，质量优先"
target_scenario: "高质量企业级项目开发"

parameters:
  max_iterations_per_task: 5
  code_completeness: "95%"
  test_coverage_target: "90%"
  documentation_level: "comprehensive"
  error_handling_depth: "detailed"
  
behavior_adjustments:
  include_advanced_features: true
  consider_all_priorities: true
  enable_refactoring: true
  use_best_practices: true
  
output_style:
  explanation_verbosity: "high"
  code_comments: "comprehensive"
  example_quantity: "multiple"
  alternative_solutions: true

time_management:
  estimated_interactions_per_phase:
    requirements: 3-4
    design: 4-5
    development: 6-8
    testing: 2-3
    
quality_gates:
  enable_all_checks: true
  multiple_validation_rounds: true
```

## 行为模式接口

### 模式切换接口
```typescript
// 模式管理接口定义
interface BehaviorMode {
  name: string
  description: string
  parameters: ModeParameters
  behaviorAdjustments: BehaviorAdjustments
  outputStyle: OutputStyle
}

interface ModeParameters {
  maxIterationsPerTask: number
  codeCompleteness: string
  testCoverageTarget: string
  documentationLevel: 'minimal' | 'standard' | 'comprehensive'
  errorHandlingDepth: 'basic' | 'standard' | 'detailed'
}

interface ModeManager {
  getCurrentMode(): BehaviorMode
  switchMode(modeName: string): void
  suggestMode(context: ProjectContext): string
  autoSelectMode(remainingInteractions: number): string
}
```

## 与Agent系统集成

### Agent行为调节
```yaml
Agent响应调节:
  product-manager:
    Rush: 简化PRD，核心需求优先
    Deep: 深度用户研究，完整需求分析
    
  architect:
    Rush: 快速技术选型，简化架构
    Deep: 多方案比较，详细架构设计
    
  frontend-developer:
    Rush: 基础组件，快速实现
    Deep: 优化组件库，性能调优
    
  backend-developer:
    Rush: 简化API，基本功能
    Deep: 完整API，性能和安全优化
```

### 命令执行调节
```yaml
命令行为调节:
  /ut:generate/*:
    Rush: 快速生成，最小化内容
    Deep: 详细生成，多轮验证
    
  /ut:code/*:  
    Rush: MVP代码，快速实现
    Deep: 生产级代码，最佳实践
    
  /ut:validate/*:
    Rush: 基础验证，跳过次要检查
    Deep: 全面验证，多轮质量检查
```

## 最佳实践

### 模式选择指南
```yaml
选择Rush模式:
  - 时间极度紧张 (剩余<6次交互)
  - 快速概念验证 (PoC)
  - 学习和实验项目
  - 临时解决方案

选择Standard模式:
  - 正常项目开发
  - 商业应用需求
  - 平衡质量和时间
  - 大多数实际场景

选择Deep模式:
  - 企业级项目
  - 高质量要求
  - 复杂技术挑战
  - 长期维护项目

选择Learning模式:
  - 技术学习和探索
  - 团队培训项目
  - 新技术试验
  - 教学演示
```

### 动态切换策略
```yaml
阶段性调整:
  需求阶段: Learning模式理解需求
  设计阶段: Deep模式详细设计
  开发阶段: Standard模式平衡开发
  紧急修复: Rush模式快速解决
  
交互预算管理:
  充足预算(>15次): Deep模式深度开发
  正常预算(6-15次): Standard模式均衡发展
  紧张预算(<6次): Rush模式聚焦核心
```