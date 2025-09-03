# 会话加载命令 (/ut:session/load)

## 命令概述
加载历史会话状态，恢复项目上下文、进度信息、Agent配置，实现跨会话的开发连续性。

## 命令语法
```bash
/ut:session/load <session_id> [options]
```

### 参数说明
- `session_id` (必需): 会话标识符或检查点名称
- `options` (可选): 加载选项标志

### 使用示例
```bash
用户: /ut:session/load session-20240101-backend

系统: [会话管理器] 正在恢复会话...
      🔍 会话验证通过: MVP开发项目
      📋 会话信息:
         - 项目: 用户管理系统MVP
         - 进度: T8/20 - 后端基础架构已完成  
         - 模式: Standard开发模式
         - 最后更新: 2024-01-01 12:00:00
      
      🔄 正在恢复上下文...
      ✓ 项目元数据已恢复
      ✓ 进度状态已同步
      ✓ 上下文数据已解压缩 (12.1KB → 23.4KB)
      ✓ Agent配置已激活
      ✓ 引用映射已重建 (@PRD, @arch, @api)
      
      🎯 会话恢复完成!
      📍 当前状态: T8/20 - 准备开始API接口开发
      💡 建议下一步: 开始实现用户认证API
```

## 会话选择功能
```bash
用户: /ut:session/load

系统: 📚 可用会话列表:
      
      最近会话:
      1. [T8] session-backend-complete-20240101 (2小时前)
         └─ 后端架构完成，准备API开发
      
      2. [T6] session-design-phase-20231231 (1天前)  
         └─ 设计阶段完成，准备开发实现
         
      3. [T3] session-requirements-20231230 (2天前)
         └─ 需求分析完成，技术选型确定
      
      相关会话:
      4. session-auth-fix-001 (认证bug修复, 95%匹配度)
      5. session-api-optimization (API优化, 87%匹配度)
      
      💡 智能推荐: session-backend-complete-20240101
      请选择会话编号 [1-5] 或输入会话ID:
```

## 智能会话推荐
- 基于当前任务相似度匹配
- 技术栈兼容性分析
- 历史成功率权重评估
- 上下文相关性评分

## 恢复验证机制
- 数据完整性校验
- 文件依赖关系验证  
- Agent配置兼容性检查
- Token预算合理性评估

---
**命令版本**: v1.3.0
**维护责任**: UltraThink会话管理团队
