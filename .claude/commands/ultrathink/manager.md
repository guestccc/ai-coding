# 会话管理器 (Session Manager)

## 职责概述
作为UltraThink框架的会话持久化核心组件，负责会话生命周期管理、状态序列化、跨会话上下文恢复等功能。

## 会话数据结构

### 会话元数据格式 (SessionMetadata)
```json
{
  "sessionId": "ut-session-[timestamp]-[random]",
  "projectName": "项目名称",
  "frameworkVersion": "v1.3.0",
  "startTime": "2024-01-01T00:00:00Z",
  "lastUpdateTime": "2024-01-01T12:30:00Z",
  "mode": "standard|rush|deep|learning",
  "status": "active|paused|completed|archived",
  "progress": {
    "currentStage": "T7",
    "totalStages": 20,
    "completedTasks": ["T1", "T2", "T3", "T4", "T5", "T6"],
    "currentTask": "后端基础架构搭建",
    "milestones": [
      {
        "stage": "T6", 
        "description": "设计阶段完成",
        "timestamp": "2024-01-01T10:00:00Z"
      }
    ]
  },
  "context": {
    "activeFiles": [
      "docs/PRD.md",
      "docs/architecture.md", 
      "docs/openapi.yaml"
    ],
    "recentDecisions": ["DR-008", "DR-009", "DR-010"],
    "openProblems": ["P-003", "P-004"],
    "keyPatterns": ["P-S001", "P-B002"],
    "techStack": {
      "frontend": "React 18 + TypeScript + Vite",
      "backend": "Express + Prisma + PostgreSQL",
      "testing": "Jest + Playwright"
    }
  },
  "tokens": {
    "totalUsed": 45000,
    "budgetLimit": 100000,
    "efficiency": 0.85,
    "compressionRatio": 0.42,
    "lastOptimization": "2024-01-01T11:00:00Z"
  }
}
```

### 会话快照结构 (SessionSnapshot)
```json
{
  "snapshotId": "checkpoint-[stage]-[timestamp]",
  "sessionId": "ut-session-xxx",
  "stage": "T7",
  "description": "后端基础架构完成",
  "timestamp": "2024-01-01T12:00:00Z",
  "files": {
    "created": ["src/server.ts", "src/config/database.ts"],
    "modified": ["package.json", ".env.example"],
    "deleted": []
  },
  "contextState": {
    "compressedContext": "...",  // 压缩后的上下文
    "references": {               // 引用映射
      "@PRD": "docs/PRD.md",
      "@arch": "docs/architecture.md"
    }
  },
  "agentOutputs": {
    "architect-agent": {"status": "✓", "score": "A", "suggestions": []},
    "backend-developer": {"status": "✓", "score": "A", "notes": "基础架构搭建完成"}
  }
}
```

## 核心功能实现

### 1. 会话创建与初始化
```yaml
功能: 创建新的开发会话
触发: 项目开始或/ut:session/new命令
流程:
  1. 生成唯一会话ID
  2. 检测项目模式(rush/standard/deep)
  3. 初始化会话元数据
  4. 创建会话工作目录
  5. 设置初始上下文
```

### 2. 会话状态持久化
```yaml
功能: 自动保存会话状态
触发: 每次重要操作后、定时保存、手动保存
策略:
  - 增量保存: 只保存变更部分
  - 快照机制: 重要里程碑创建完整快照
  - 压缩存储: 上下文智能压缩
  - 版本控制: 支持状态回滚
```

### 3. 会话恢复与切换
```yaml
功能: 恢复历史会话状态
触发: /ut:session/load命令
流程:
  1. 验证会话ID有效性
  2. 加载会话元数据
  3. 恢复上下文状态
  4. 重建引用映射
  5. 激活相关Agent配置
```

### 4. 跨会话上下文传递
```yaml
功能: 在不同会话间共享知识
场景:
  - 相似项目经验复用
  - 通用问题解决方案
  - 最佳实践模式应用
实现:
  - 知识图谱构建
  - 经验模式匹配
  - 上下文智能推荐
```

## 智能优化机制

### 1. 上下文压缩算法
```yaml
压缩策略:
  频率分析: 高频词汇符号化替换
  结构优化: 重复结构模板化
  引用替代: 长文档引用化处理
  语义保持: 关键语义信息保留
  
压缩示例:
  原文: "React前端开发需要配置TypeScript类型检查系统"
  压缩: "@FE:需要@TS类型检查"
  压缩率: 65%
```

### 2. Token使用监控
```yaml
监控指标:
  - 实时Token消耗
  - 压缩效率统计
  - 上下文窗口利用率
  - 历史使用趋势
  
优化建议:
  - 低效引用自动清理
  - 冗余内容智能压缩
  - 上下文窗口优化分配
  - 历史数据归档策略
```

### 3. 智能会话推荐
```yaml
推荐场景:
  相似项目: 基于技术栈和需求匹配
  解决方案: 基于问题模式匹配  
  最佳实践: 基于成功经验模式
  风险预警: 基于历史问题记录

推荐算法:
  - 向量相似度计算
  - 关键特征匹配
  - 历史成功率权重
  - 上下文相关性评分
```

## 使用示例

### 保存会话场景
```
用户: /ut:session/save "MVP后端完成"
系统: [会话管理器] 正在保存会话状态...
      ✓ 已保存会话元数据 (2.1KB压缩)
      ✓ 已创建检查点快照 checkpoint-T8-20240101
      ✓ 上下文压缩率: 47% (节省23KB Token)
      📊 会话统计: T8/20 | 已用Token: 47K/100K | 效率: 87%
```

### 恢复会话场景
```
用户: /ut:session/load session-20240101-1200
系统: [会话管理器] 正在恢复会话...
      ✓ 会话验证通过: MVP开发项目
      ✓ 上下文恢复完成 (解压缩25KB)
      ✓ Agent配置已激活
      ✓ 引用映射已重建 (@PRD, @arch, @api)
      📍 会话状态: T8/20 - 后端基础架构已完成
```

### 会话切换场景  
```
用户: 现在需要修复一个认证bug
系统: [智能推荐] 发现相关会话:
      1. session-auth-fix-001 (95%匹配) - JWT认证问题
      2. session-auth-fix-002 (87%匹配) - 权限验证bug  
      
      推荐使用模式: Fix模式 + Auth-Expert
      是否切换到bug修复会话? [Y/n]
```

## 配置选项

### 会话管理配置
```yaml
# project/sessions/config.json
{
  "autoSave": {
    "enabled": true,
    "interval": 300,  # 5分钟自动保存
    "triggerEvents": ["file-change", "command-complete", "agent-verify"]
  },
  "compression": {
    "enabled": true,
    "algorithm": "lz4",
    "level": "balanced",  # fast|balanced|maximum
    "minSize": 1024       # 小于1KB不压缩
  },
  "retention": {
    "activeSessions": 10,    # 最多保留10个活动会话
    "historyDays": 30,       # 历史会话保留30天
    "archiveAfterDays": 7    # 7天后自动归档
  },
  "privacy": {
    "excludePatterns": ["*.env", "*.key", "password", "secret"],
    "anonymizeData": false,   # 是否匿名化敏感数据
    "encryptStorage": false   # 是否加密存储
  }
}
```

## 错误处理

### 常见问题与解决方案
```yaml
会话损坏:
  症状: 无法加载会话文件
  原因: 文件损坏或格式错误
  解决: 从最近快照恢复 + 增量重建

内存不足:
  症状: 会话加载失败
  原因: 上下文数据过大
  解决: 强制压缩 + 历史数据清理

引用失效:
  症状: 文件引用无法解析
  原因: 引用文件被删除或移动
  解决: 智能路径修复 + 用户确认

Token超限:
  症状: 上下文窗口溢出
  原因: 压缩效率不足
  解决: 增强压缩 + 历史数据归档
```

## 性能优化

### 加载性能优化
```yaml
延迟加载: 按需加载会话数据块
缓存机制: 常用数据内存缓存
索引优化: 会话元数据快速检索
并行处理: 并行加载多个数据块
```

### 存储空间优化
```yaml
增量存储: 只存储变更差异
重复数据消除: 相同内容引用共享
压缩算法: 高效压缩减少存储
自动清理: 过期数据自动删除
```

---

**版本**: v1.3.0  
**最后更新**: 2024-01-01  
**维护责任**: UltraThink会话管理团队