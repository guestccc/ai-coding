# 英语学习训练移动端Web项目 - 技术架构文档

## 1. 架构概述

### 1.1 架构目标
构建一个高性能、可扩展、易维护的英语学习移动端Web应用，支持10,000+日活跃用户，提供流畅的学习体验。

### 1.2 架构原则
- **移动优先**: 优先优化移动端体验
- **渐进增强**: 支持离线功能和弱网环境
- **微服务化**: 模块化设计便于扩展
- **性能优化**: 快速响应和低资源消耗

## 2. 技术栈选择

### 2.1 前端技术栈
| 技术 | 选择 | 评估理由 |
|------|------|----------|
| 框架 | React 18 + TypeScript | 类型安全、生态丰富、性能优秀 |
| UI库 | Ant Design Mobile | 移动端优化、组件丰富、主题定制 |
| 状态管理 | Redux Toolkit + RTK Query | 状态管理标准化、内置异步处理 |
| 构建工具 | Vite | 快速冷启动、热更新、Tree Shaking |
| 包管理器 | pnpm | 安装速度快、磁盘空间优化 |
| 样式方案 | CSS Modules + Less | 模块化样式、变量支持 |

### 2.2 后端技术栈
| 技术 | 选择 | 评估理由 |
|------|------|----------|
| 运行时 | Node.js 18+ | 异步IO、高并发、JavaScript全栈 |
| 框架 | NestJS | 模块化、TypeScript支持、企业级特性 |
| 数据库 | PostgreSQL | 关系型、JSON支持、事务安全 |
| 缓存 | Redis | 高性能缓存、会话管理 |
| ORM | Prisma | 类型安全、迁移工具、查询优化 |
| API | RESTful + GraphQL | REST用于基础CRUD，GraphQL用于复杂查询 |

### 2.3 基础设施
| 服务 | 选择 | 用途 |
|------|------|------|
| 语音识别 | 科大讯飞 | 口语评测、语音转文字 |
| 文件存储 | AWS S3/阿里云OSS | 音频、图片存储 |
| CDN | 腾讯云CDN | 静态资源加速 |
| 监控 | Prometheus + Grafana | 系统监控、性能分析 |
| 日志 | ELK Stack | 日志收集和分析 |

## 3. 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                       客户端 (Web)                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React App  │  │   PWA功能   │  │    Service Worker   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                       网关层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Nginx反向代理 │  │  负载均衡   │  │     API网关        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ 内部API调用
┌─────────────────────────────────────────────────────────────┐
│                       应用服务层                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  用户服务    │  │  学习服务   │  │   评估服务          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  内容服务    │  │  推荐服务   │  │   社区服务          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ 数据访问
┌─────────────────────────────────────────────────────────────┐
│                       数据存储层                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ PostgreSQL  │  │   Redis     │  │    对象存储         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 4. 分层设计

### 4.1 前端架构

#### 4.1.1 组件结构
```
src/
├── components/          # 通用组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   └── learning/       # 学习相关组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hook
├── services/           # API服务
├── stores/             # 状态管理
├── utils/              # 工具函数
└── types/              # TypeScript类型定义
```

#### 4.1.2 状态管理设计
- **全局状态**: 用户信息、主题设置、应用配置
- **模块状态**: 学习进度、课程数据、练习结果
- **本地状态**: 组件内部状态、表单数据

### 4.2 后端架构

#### 4.2.1 微服务划分
1. **用户服务 (user-service)**: 认证、授权、用户管理
2. **学习服务 (learning-service)**: 课程、进度、学习记录
3. **评估服务 (assessment-service)**: AI评测、成绩计算
4. **内容服务 (content-service)**: 词库、听力材料、文章
5. **推荐服务 (recommendation-service)**: 个性化推荐算法
6. **社区服务 (community-service)**: 小组、动态、互动

#### 4.2.2 API设计原则
- RESTful风格，资源导向
- 版本控制: /api/v1/资源
- 错误码标准化
- 请求/响应格式统一

## 5. 数据库设计

### 5.1 核心表结构

#### 5.1.1 用户相关表
```sql
-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    nickname VARCHAR(100),
    avatar_url TEXT,
    level INTEGER DEFAULT 1,
    learning_goal TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 用户学习档案
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vocabulary_count INTEGER DEFAULT 0,
    listening_score INTEGER DEFAULT 0,
    speaking_score INTEGER DEFAULT 0,
    reading_score INTEGER DEFAULT 0,
    writing_score INTEGER DEFAULT 0,
    total_study_time INTEGER DEFAULT 0
);
```

#### 5.1.2 学习内容表
```sql
-- 词库表
CREATE TABLE vocabularies (
    id SERIAL PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    pronunciation VARCHAR(255),
    definition TEXT,
    example TEXT,
    level INTEGER,
    category VARCHAR(50),
    tags TEXT[]
);

-- 课程表
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level INTEGER,
    duration INTEGER,
    cover_image TEXT,
    is_public BOOLEAN DEFAULT true
);
```

#### 5.1.3 学习记录表
```sql
-- 学习进度表
CREATE TABLE learning_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    lesson_id INTEGER,
    status VARCHAR(20) DEFAULT 'not_started',
    progress_percentage INTEGER DEFAULT 0,
    last_studied_at TIMESTAMP,
    completed_at TIMESTAMP
);

-- 练习记录表
CREATE TABLE practice_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    practice_type VARCHAR(50), -- vocabulary, listening, speaking, etc.
    practice_id INTEGER,
    score INTEGER,
    time_spent INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 5.2 索引优化
- 用户表的email、phone字段索引
- 学习记录表的user_id、course_id复合索引
- 练习记录表的user_id、practice_type索引

### 5.3 缓存策略
- Redis缓存热点数据
- 用户会话信息缓存
- 课程内容缓存
- API响应缓存

## 6. API设计原则

### 6.1 RESTful规范
- 资源使用名词复数形式
- HTTP方法语义化: GET(查询)、POST(创建)、PUT(更新)、DELETE(删除)
- 状态码正确使用: 200(成功)、201(创建成功)、400(参数错误)、401(未认证)、403(无权限)、404(不存在)、500(服务器错误)

### 6.2 请求响应格式
```typescript
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "timestamp": 1640995200000
}

// 错误响应
{
  "code": 400,
  "message": "参数验证失败",
  "errors": [
    { "field": "email", "message": "邮箱格式不正确" }
  ],
  "timestamp": 1640995200000
}
```

### 6.3 重要API端点

#### 6.3.1 认证相关
```
POST /api/v1/auth/login          # 用户登录
POST /api/v1/auth/register       # 用户注册
POST /api/v1/auth/logout         # 用户登出
GET  /api/v1/auth/profile        # 获取用户信息
```

#### 6.3.2 学习相关
```
GET  /api/v1/courses             # 获取课程列表
GET  /api/v1/courses/:id         # 获取课程详情
POST /api/v1/learn/progress      # 更新学习进度
GET  /api/v1/learn/recommend     # 获取推荐内容
```

#### 6.3.3 练习相关
```
POST /api/v1/practice/vocabulary # 词汇练习
POST /api/v1/practice/listening  # 听力练习
POST /api/v1/practice/speaking   # 口语练习
GET  /api/v1/practice/results    # 获取练习结果
```

## 7. 非功能性设计

### 7.1 性能优化

#### 7.1.1 前端性能
- 代码分割和懒加载
- 图片懒加载和WebP格式
- 组件级别的memoization
- 虚拟列表优化长列表

#### 7.1.2 后端性能
- 数据库查询优化
- Redis缓存热点数据
- CDN加速静态资源
- 接口响应压缩

### 7.2 安全设计

#### 7.2.1 认证授权
- JWT token认证
- RBAC权限控制
- 密码加密存储(bcrypt)
- 登录失败次数限制

#### 7.2.2 数据安全
- HTTPS全站加密
- SQL注入防护
- XSS攻击防护
- CSRF令牌保护

### 7.3 可用性设计
- 服务健康检查
- 优雅降级机制
- 错误边界处理
- 用户操作确认

### 7.4 可靠性设计
- 数据库主从复制
- 服务冗余部署
- 监控告警系统
- 日志追踪系统

## 8. 部署架构

### 8.1 开发环境
- Docker Compose本地开发
- 热重载开发服务器
- 本地数据库和缓存

### 8.2 测试环境
- 独立测试服务器
- 自动化测试流水线
- 性能测试环境

### 8.3 生产环境
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   负载均衡器     │    │   应用服务器     │    │   数据库集群     │
│   (Nginx)      │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        ▲                         ▲                      ▲
        │                         │                      │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     CDN节点      │    │    缓存集群      │    │    对象存储      │
│   (静态资源)     │    │    (Redis)      │    │   (S3/OSS)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 8.4 监控告警
- Prometheus指标收集
- Grafana数据可视化
- Alertmanager告警通知
- ELK日志分析

## 9. 风险评估

### 9.1 技术风险
1. **第三方服务依赖**: 语音识别服务稳定性
   -  mitigation: 备用服务商、本地降级方案

2. **性能瓶颈**: 高并发下的AI评测服务
   - mitigation: 请求队列、异步处理、缓存结果

3. **数据一致性**: 分布式事务处理
   - mitigation: 最终一致性、补偿事务

### 9.2 业务风险
1. **用户隐私**: 学习数据敏感性
   - mitigation: 数据加密、隐私政策、用户授权

2. **内容版权**: 学习材料版权问题
   - mitigation: 正版采购、UGC内容审核

### 9.3 运维风险
1. **部署复杂度**: 微服务架构运维成本
   - mitigation: 容器化部署、自动化运维

2. **监控覆盖**: 系统健康状态监控
   - mitigation: 全面的监控告警体系

---

*文档版本: v1.0*
*最后更新: 2025-09-03*
*评审人: 架构团队、开发团队、运维团队*