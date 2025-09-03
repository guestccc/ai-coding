# 会话序列化器 (Session Serializer)

## 职责概述
负责会话状态的序列化、反序列化、压缩、解压缩等数据转换操作，确保会话数据的高效存储和准确恢复。

## 序列化策略

### 1. 分层序列化架构
```yaml
L1-元数据层: 会话基本信息（ID、时间、模式等）
L2-状态层: 项目进度、任务完成状态
L3-上下文层: 文件引用、决策记录、问题清单
L4-内容层: 具体文件内容、代码片段
L5-缓存层: Agent输出、临时数据
```

### 2. 数据结构映射
```json
{
  "meta": {
    "version": "1.3.0",
    "timestamp": "2024-01-01T12:00:00Z",
    "compression": "lz4",
    "encoding": "utf-8"
  },
  "session": {
    "id": "ut-session-xxx",
    "project": "项目名称",
    "mode": "standard",
    "stage": "T8/20"
  },
  "context": {
    "compressed": true,
    "algorithm": "reference-substitution",
    "data": "压缩后的上下文数据",
    "references": {
      "@PRD": "docs/PRD.md",
      "@arch": "docs/architecture.md",
      "@api": "docs/openapi.yaml"
    }
  },
  "checksum": "sha256-hash"
}
```

## 智能压缩算法

### 1. 引用替换压缩 (Reference Substitution)
```yaml
原理: 将重复出现的长文本替换为短引用标识

示例转换:
原文: "根据docs/PRD.md文件中的用户认证需求，我们需要实现JWT认证系统"
压缩: "根据@PRD中的用户认证需求，我们需要实现@JWT认证系统"
引用表: 
  "@PRD": "docs/PRD.md文件"
  "@JWT": "JWT"

压缩效果:
  原文长度: 47字符
  压缩后: 28字符
  压缩率: 40%
```

### 2. 语义相似度聚类压缩
```yaml
算法: 将语义相似的内容聚类，用代表性描述替代

聚类示例:
原文:
  - "前端React组件开发"
  - "React前端组件实现"  
  - "开发React界面组件"
  
压缩: "@FE-Component-Dev" (3个变体 → 1个引用)
压缩率: 75%
```

### 3. 上下文窗口优化压缩
```yaml
策略: 根据当前任务相关性动态调整内容详细程度

相关性权重:
  - 当前任务直接相关: 100% (保持原始)
  - 近期任务相关: 70% (适度压缩)
  - 历史任务相关: 40% (高度压缩)
  - 无关内容: 10% (仅保留引用)
```

## Token优化技术

### 1. 符号化映射表
```yaml
# 技术术语映射
技术栈映射:
  "React前端应用": "@React"
  "Express后端服务": "@Express"  
  "PostgreSQL数据库": "@PG"
  "TypeScript类型检查": "@TS"
  "Prisma ORM": "@Prisma"

操作映射:
  "增删改查": "@CRUD"
  "用户认证": "@Auth"
  "权限管理": "@Permission"
  "数据验证": "@Validate"
  "错误处理": "@Error"

状态映射:
  "已完成": "✓"
  "进行中": "🔄"
  "待开始": "⏳"
  "有问题": "⚠️"
```

### 2. 结构化数据压缩
```yaml
# JSON结构优化
原始JSON:
{
  "taskId": "T8",
  "taskName": "后端基础架构",
  "status": "completed",
  "startTime": "2024-01-01T10:00:00Z",
  "endTime": "2024-01-01T12:00:00Z"
}

压缩JSON:
{
  "id": "T8",
  "name": "@BE基础",
  "status": "✓", 
  "time": ["10:00", "12:00"]
}

压缩率: 62%
```

### 3. 增量序列化策略
```yaml
# 只序列化变更部分
增量记录格式:
{
  "baseSnapshot": "checkpoint-T7",
  "delta": {
    "added": ["新增的任务T8"],
    "modified": ["修改的配置项"],
    "deleted": ["删除的临时文件"]
  },
  "deltaSize": "2.3KB"
}

全量重建触发条件:
  - 增量累计大小 > 10KB
  - 增量记录数 > 50条
  - 距离上次全量 > 24小时
```

## 序列化实现

### 1. 核心序列化函数
```javascript
// 伪代码示例
class SessionSerializer {
  serialize(sessionState) {
    // 1. 提取元数据
    const meta = this.extractMetadata(sessionState);
    
    // 2. 压缩上下文
    const compressedContext = this.compressContext(
      sessionState.context
    );
    
    // 3. 构建引用映射
    const references = this.buildReferenceMap(compressedContext);
    
    // 4. 生成校验和
    const checksum = this.generateChecksum(data);
    
    return {
      meta,
      session: sessionState.core,
      context: {
        compressed: true,
        data: compressedContext,
        references
      },
      checksum
    };
  }
  
  deserialize(serializedData) {
    // 1. 验证校验和
    this.verifyChecksum(serializedData);
    
    // 2. 解压缩上下文
    const context = this.decompressContext(
      serializedData.context.data,
      serializedData.context.references
    );
    
    // 3. 重建会话状态
    return this.rebuildSessionState(
      serializedData.session,
      context
    );
  }
}
```

### 2. 上下文压缩函数
```javascript
// 上下文压缩实现
compressContext(context) {
  let compressed = context;
  
  // 引用替换
  compressed = this.applyReferenceSubstitution(compressed);
  
  // 符号化映射
  compressed = this.applySymbolMapping(compressed);
  
  // 结构优化
  compressed = this.optimizeStructure(compressed);
  
  // 算法压缩
  compressed = this.algorithmicCompress(compressed);
  
  return compressed;
}
```

## 数据完整性保证

### 1. 校验和机制
```yaml
算法: SHA-256哈希
覆盖: 所有序列化数据
验证: 反序列化前必须验证
失败处理: 提示数据损坏并尝试修复
```

### 2. 版本兼容性
```yaml
版本标识: 每个序列化数据包含版本号
向前兼容: 新版本可读取旧版本数据
向后兼容: 使用降级序列化确保兼容性
迁移机制: 自动升级旧版本格式
```

### 3. 错误恢复机制
```yaml
备份策略: 每次序列化前创建备份
损坏检测: 反序列化时自动检测损坏
自动修复: 尝试从备份和增量记录修复
用户确认: 修复失败时请求用户介入
```

## 性能优化

### 1. 延迟序列化
```yaml
触发条件:
  - 会话状态发生重要变更
  - 用户主动保存请求
  - 系统定时自动保存
  
延迟策略:
  - 小变更批量处理
  - 重要变更立即处理
  - 空闲时间批量序列化
```

### 2. 内存管理
```yaml
流式处理: 大文件分块序列化
内存复用: 缓冲区重复使用
垃圾回收: 及时释放临时对象
内存监控: 序列化过程内存使用监控
```

### 3. 并发处理
```yaml
读写分离: 序列化不影响读取操作
异步处理: 序列化操作异步执行
锁机制: 避免并发序列化冲突
队列管理: 序列化任务队列化处理
```

## 使用示例

### 基本序列化操作
```
# 序列化当前会话
系统: [序列化器] 开始序列化会话状态...
      ✓ 元数据提取完成 (127 bytes)
      ✓ 上下文压缩完成 (23.4KB → 12.1KB, 48%压缩率)
      ✓ 引用映射构建完成 (15个引用)
      ✓ 数据完整性校验通过
      💾 序列化完成: session-T8-20240101.json (12.3KB)
```

### 反序列化恢复
```
# 反序列化历史会话  
系统: [序列化器] 开始反序列化会话...
      ✓ 数据完整性校验通过
      ✓ 版本兼容性检查通过 (v1.3.0)
      ✓ 引用映射解析完成
      ✓ 上下文解压缩完成 (12.1KB → 23.4KB)
      ✨ 反序列化完成: 会话状态已恢复
```

### 压缩效果报告
```
# 压缩统计报告
📊 序列化压缩报告:
   原始大小: 48.7KB
   压缩后: 21.3KB  
   压缩率: 56%
   
   压缩分解:
   - 引用替换: 28% (13.6KB节省)
   - 符号映射: 15% (7.3KB节省)  
   - 结构优化: 8% (3.9KB节省)
   - 算法压缩: 5% (2.6KB节省)
```

## 配置选项

### 序列化配置
```yaml
# .claude/ultrathink/session/serializer-config.json
{
  "compression": {
    "enabled": true,
    "algorithm": "hybrid",  # reference|symbol|hybrid
    "level": "balanced",    # fast|balanced|maximum  
    "minThreshold": 512     # 小于512B不压缩
  },
  "references": {
    "maxReferences": 100,   # 最多100个引用
    "minSavings": 10,       # 至少节省10字符才创建引用
    "commonPatterns": [     # 预定义常用模式
      "docs/*.md",
      "src/**/*.ts",
      "@Agent-*"
    ]
  },
  "integrity": {
    "checksumAlgorithm": "sha256",
    "verifyOnLoad": true,
    "backupOnSave": true,
    "maxBackups": 5
  }
}
```

---

**版本**: v1.3.0  
**最后更新**: 2024-01-01  
**维护责任**: UltraThink序列化团队