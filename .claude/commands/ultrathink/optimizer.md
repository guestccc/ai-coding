# Token优化器 (Token Optimizer)

## 职责概述
专门负责Token使用效率优化，通过智能压缩、引用管理、上下文窗口优化等技术，实现30-50%的Token节省，同时保持信息完整性和可理解性。

## 核心优化策略

### 1. 智能引用系统 (Smart Reference System)
```yaml
引用模式设计:
  文件引用: "@file:filename:lines"  # @file:PRD.md:45-67
  决策引用: "@dr:decision-id"       # @dr:DR-008
  模式引用: "@pattern:pattern-id"   # @pattern:P-S001
  代码引用: "@code:path:function"   # @code:src/api.ts:getUserById
  概念引用: "@concept:name"         # @concept:JWT认证系统

引用收益分析:
原文: "根据docs/PRD.md文件第45-67行的用户认证需求分析"
优化: "根据@file:PRD.md:45-67的用户认证需求分析"  
节省: 15字符 (35%压缩率)

批量引用示例:
原文: "参考docs/architecture.md的系统架构设计和docs/openapi.yaml的API定义"
优化: "参考@arch的系统架构设计和@api的API定义"
引用表: {"@arch": "docs/architecture.md", "@api": "docs/openapi.yaml"}
节省: 42字符 (58%压缩率)
```

### 2. 术语符号化系统 (Term Symbolization)
```yaml
# 技术栈符号化映射
技术术语:
  "React前端应用": "@React"
  "TypeScript类型检查": "@TS"
  "Express后端服务": "@Express"  
  "PostgreSQL数据库": "@PG"
  "Prisma ORM数据层": "@Prisma"
  "JWT认证系统": "@JWT"
  "RESTful API接口": "@API"

业务术语:
  "用户认证功能": "@Auth"
  "权限管理系统": "@Permission"
  "数据验证机制": "@Validate"
  "错误处理逻辑": "@ErrorHandler"
  "增删改查操作": "@CRUD"
  "单元测试用例": "@UnitTest"

状态符号:
  "已完成": "✓"
  "进行中": "🔄" 
  "待开始": "⏳"
  "有问题": "⚠️"
  "需要关注": "🔍"
  "高优先级": "🔥"

优化示例:
原文: "React前端应用需要实现JWT认证系统的用户登录功能，包含完整的错误处理逻辑和单元测试用例"
优化: "@React需要实现@JWT的用户登录功能，包含完整的@ErrorHandler和@UnitTest"
节省: 38字符 (54%压缩率)
```

### 3. 结构化数据压缩 (Structured Data Compression)
```yaml
# JSON结构压缩
任务状态压缩:
原始:
{
  "taskId": "T8", 
  "taskName": "后端基础架构实现",
  "status": "completed",
  "priority": "high",
  "assignee": "backend-developer-agent",
  "startTime": "2024-01-01T10:00:00Z",
  "completionTime": "2024-01-01T12:00:00Z",
  "description": "搭建Express服务器和数据库连接"
}

压缩:
{
  "id": "T8",
  "name": "@BE基础架构",
  "status": "✓",
  "priority": "🔥", 
  "agent": "@BE-Dev",
  "time": ["10:00", "12:00"],
  "desc": "搭建@Express服务器和@DB连接"
}

压缩效果: 原始312字符 → 压缩147字符 (53%压缩率)
```

### 4. 语义保持压缩算法 (Semantic-Preserving Compression)
```yaml
# 语义级别压缩策略
高价值信息(100%保留):
  - 关键业务逻辑描述
  - 重要技术决策理由
  - 错误处理和风险点
  - 测试用例和验收标准

中价值信息(70%保留):
  - 实现细节说明
  - 配置参数描述
  - 代码注释内容
  - 操作步骤说明

低价值信息(30%保留):
  - 重复性描述
  - 过渡性语句  
  - 礼貌用语
  - 冗余解释

压缩示例:
原文: "非常感谢您的建议！现在我需要根据您提到的架构设计文档来实现用户认证功能。这个功能确实很重要，我会仔细按照文档要求来开发。"
压缩: "根据@arch实现@Auth功能"
保留语义: ✓ (核心语义完整保留)
压缩率: 86%
```

## 上下文窗口管理

### 1. 窗口分配策略
```yaml
Token预算分配 (100K总预算):
  核心上下文: 30K (30%) - 当前任务、关键决策、重要问题
  工作内存: 50K (50%) - 当前代码、活动文档、Agent对话
  历史记录: 15K (15%) - 近期操作历史、相关经验
  预留缓冲: 5K (5%) - 紧急信息、错误处理

动态调整机制:
  - 任务切换时重新分配比例
  - 复杂任务增加工作内存分配
  - 新项目减少历史记录分配
  - 紧急情况释放预留缓冲
```

### 2. 上下文优先级管理
```yaml
P0 (最高优先级) - 立即访问:
  - 当前任务描述和目标
  - 正在编辑的文件内容  
  - 活跃Agent的输出结果
  - 关键错误和警告信息

P1 (高优先级) - 快速访问:
  - 项目需求文档(PRD)
  - 技术架构设计文档
  - API接口规范文件
  - 当前阶段的决策记录

P2 (中优先级) - 按需加载:
  - 历史任务完成记录
  - 相关代码模式和模板
  - 以往问题解决方案
  - 最佳实践经验总结

P3 (低优先级) - 引用访问:
  - 详细的实现文档
  - 完整的代码仓库
  - 历史会话记录
  - 学习资料和参考文档
```

### 3. 智能内容裁剪
```yaml
内容裁剪算法:
1. 相关性评分: 根据当前任务计算内容相关性
2. 时效性评分: 根据时间衰减计算内容重要性  
3. 引用频率评分: 根据历史引用频率评分
4. 综合排序: 加权计算最终优先级分数
5. 动态裁剪: 根据Token预算动态调整保留内容

评分公式:
Score = w1×Relevance + w2×Freshness + w3×Frequency + w4×Importance
权重: w1=0.4, w2=0.2, w3=0.2, w4=0.2

裁剪示例:
总内容: 120K Token
预算: 80K Token  
裁剪率: 33%

保留内容:
- P0内容: 100%保留 (24K)
- P1内容: 90%保留 (27K) 
- P2内容: 60%保留 (18K)
- P3内容: 20%保留 (11K)
总计: 80K Token
```

## 实时优化监控

### 1. Token使用监控仪表板
```yaml
实时监控指标:
  当前使用: 45,230 / 100,000 Token (45.2%)
  压缩效率: 47% (节省40,157 Token)
  窗口利用率: 83% (建议清理历史数据)
  优化建议: 3个 (点击查看详细建议)

历史趋势分析:
  - 过去7天平均使用: 52,341 Token
  - 压缩效率趋势: ↗️ 提升8%
  - 峰值使用: 87,432 Token (T15阶段)
  - 最佳效率: 61% (T3阶段)
```

### 2. 智能优化建议系统
```yaml
优化建议算法:
1. 检测低效使用模式
2. 识别冗余信息区域
3. 分析引用优化机会
4. 提供具体优化方案

建议示例:
🔍 检测到优化机会:
   1. "docs/PRD.md"重复引用12次 → 建议使用@PRD引用 (节省156 Token)
   2. 历史代码片段占用15% → 建议归档到引用库 (节省12K Token)
   3. Agent输出详细度过高 → 建议启用简洁模式 (节省20% Token)

自动优化选项:
□ 自动应用引用替换 (安全)
□ 自动清理过期内容 (需确认)
□ 自动启用简洁模式 (可撤销)
```

### 3. 压缩质量评估
```yaml
质量评估维度:
  信息完整性: 97% (关键信息无丢失)
  可理解性: 93% (压缩后仍易理解)  
  可恢复性: 100% (可完整恢复原始内容)
  压缩效率: 47% (Token节省率)

质量保证机制:
  - 关键信息标记保护
  - 压缩前后语义验证
  - 用户确认重要变更
  - 支持一键恢复原始内容
```

## 使用示例与效果

### 1. 典型优化场景
```
# 优化前的原始对话
用户: 我需要根据docs/PRD.md文件中第45-67行的用户认证需求，实现一个完整的JWT认证系统，包括用户登录、注册、密码重置功能，同时要保证TypeScript类型安全，并且需要编写完整的单元测试用例来验证功能正确性。

# Token优化器处理
系统: [Token优化器] 正在优化输入内容...
      ✓ 检测到7个可优化术语
      ✓ 创建3个新引用 (@PRD:45-67, @JWT, @TS)
      ✓ 应用符号化映射
      
# 优化后的内容  
优化结果: 需要根据@PRD:45-67的用户认证需求，实现完整的@JWT系统，包括用户登录、注册、密码重置功能，保证@TS类型安全，编写完整的@UnitTest验证功能正确性。

# 优化效果
原始Token: 187
优化Token: 98
节省率: 48%
语义保持: 100%
```

### 2. 会话级别优化效果
```
# 完整会话优化报告
📊 会话Token优化报告 - Session T8/20

原始消耗: 85,430 Token
优化消耗: 45,670 Token  
节省总量: 39,760 Token (47%)

优化分解:
✓ 引用替换: 18,230 Token (21%)
✓ 符号化映射: 12,450 Token (15%) 
✓ 结构压缩: 6,780 Token (8%)
✓ 内容裁剪: 2,300 Token (3%)

质量指标:
✓ 信息完整性: 98%
✓ 可理解性: 95%
✓ 恢复准确性: 100%

推荐操作:
🎯 当前效率已达到最佳水平
📈 预计剩余12个交互可节省47K Token
⚡ 建议保持当前优化设置
```

### 3. 智能建议示例
```
# 智能优化建议
💡 Token优化建议 (基于当前使用模式):

1. 高频术语符号化 (预计节省12%):
   - "用户认证系统" → "@Auth" (出现23次)
   - "数据库连接" → "@DB-Conn" (出现18次)
   - "错误处理" → "@Error" (出现15次)

2. 文档引用优化 (预计节省15%):
   - docs/architecture.md → @arch (引用31次)
   - src/types/user.ts → @UserType (引用12次)

3. 历史内容清理 (预计节省8%):
   - T1-T4阶段内容 → 归档到引用库
   - 过期Agent输出 → 保留摘要版本

📋 是否应用建议?
[✓] 应用术语符号化 (安全)
[✓] 应用文档引用 (安全)
[?] 应用历史清理 (需确认)
```

## 配置与定制

### 1. 优化器配置
```yaml
# .claude/ultrathink/session/optimizer-config.json
{
  "compression": {
    "enabled": true,
    "aggressiveness": "balanced",  # conservative|balanced|aggressive
    "minSavings": 5,              # 最少节省5个Token才压缩
    "preserveSemantics": true,    # 严格保持语义完整性
    "userConfirmThreshold": 20    # 超过20%压缩需用户确认
  },
  "references": {
    "autoGenerate": true,         # 自动生成引用
    "minOccurrences": 3,          # 至少出现3次才创建引用
    "maxReferences": 100,         # 最多100个引用
    "suggestOptimization": true   # 主动建议引用优化
  },
  "monitoring": {
    "enabled": true,
    "realTimeAlerts": true,       # 实时Token使用警告
    "efficiencyTarget": 0.6,      # 目标压缩效率60%
    "budgetWarning": 0.8          # 80%预算时警告
  },
  "quality": {
    "minInformationRetention": 0.95,  # 最少保留95%信息
    "semanticVerification": true,      # 语义验证
    "recoverabilityCheck": true        # 可恢复性检查
  }
}
```

### 2. 自定义符号映射
```yaml
# .claude/ultrathink/session/symbol-maps.json
{
  "project-specific": {
    "用户管理系统": "@UserMgmt",
    "订单处理流程": "@OrderFlow", 
    "支付集成接口": "@PaymentAPI",
    "商品库存管理": "@Inventory"
  },
  "team-conventions": {
    "前端团队": "@FE-Team",
    "后端团队": "@BE-Team",
    "测试团队": "@QA-Team",
    "产品经理": "@PM"
  },
  "domain-knowledge": {
    "电商平台": "@Ecommerce",
    "微服务架构": "@Microservice",
    "容器化部署": "@Docker",
    "CI/CD流水线": "@Pipeline"
  }
}
```

---

**版本**: v1.3.0  
**最后更新**: 2024-01-01  
**维护责任**: UltraThink Token优化团队