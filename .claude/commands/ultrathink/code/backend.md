# /ut:code/backend

**命令描述**: 调用后端开发Agent生成Express后端服务
**交互消耗**: 🔴 高消耗 (4-6次)
**激活Agent**: backend-developer.md

## 命令用法

```bash
/ut:code/backend [基于OpenAPI规范和数据模型]
```

## 前置依赖

- ✅ 必须存在: `docs/openapi.yaml`, `docs/architecture.md`
- 📋 建议存在: `docs/PRD.md`, `docs/test-plan.md`

## 执行流程

### 1. 项目脚手架创建
```bash
# Node.js + TypeScript项目初始化
npm init -y
npm install express cors helmet morgan compression
npm install jsonwebtoken bcryptjs zod
npm install @prisma/client prisma

# 开发依赖
npm install -D typescript @types/node @types/express
npm install -D @types/jsonwebtoken @types/bcryptjs
npm install -D jest @types/jest supertest
npm install -D nodemon ts-node eslint prettier
```

### 2. 项目结构设计
```
src/backend/
├── controllers/        # 控制器层
├── services/          # 业务服务层
├── models/            # 数据模型 (Prisma)
├── middleware/        # 中间件
├── routes/            # 路由定义
├── utils/             # 工具函数
├── config/            # 配置文件
├── types/             # TypeScript类型
├── __tests__/         # 测试文件
└── prisma/            # 数据库Schema
    ├── schema.prisma
    └── migrations/
```

### 3. 核心功能实现
基于@docs/openapi.yaml实现：

```yaml
RESTful API:
  - 路由设计 (符合OpenAPI规范)
  - 控制器实现 (请求处理)
  - 服务层 (业务逻辑)
  - 数据访问层 (Prisma ORM)

认证授权:
  - JWT Token认证
  - 中间件权限检查
  - 密码加密存储
  - 会话管理

数据验证:
  - Zod Schema验证
  - 请求参数验证
  - 响应数据格式化
  - 错误处理中间件
```

### 4. 数据库设计实现
```yaml
Prisma Schema:
  - 实体关系建模
  - 数据库索引优化
  - 迁移脚本生成
  - 种子数据准备

数据库操作:
  - CRUD操作封装
  - 事务管理
  - 查询优化
  - 分页和过滤
```

## 技术栈配置

### Express.js框架
```yaml
中间件配置:
  - CORS跨域处理
  - Helmet安全头
  - Morgan日志记录
  - Compression压缩
  - JSON解析和限制

错误处理:
  - 全局错误处理中间件
  - 统一响应格式
  - 错误日志记录
  - 开发/生产环境区分
```

### Prisma ORM
```yaml
数据库支持:
  - PostgreSQL (开发和生产环境)
  - 自动迁移管理
  - 类型安全查询

高级特性:
  - 关系查询优化
  - 批量操作
  - 事务支持
  - 连接池管理
```

### JWT认证系统
```yaml
认证流程:
  - 用户注册/登录
  - Token生成和验证
  - 刷新Token机制
  - 权限角色管理

安全实践:
  - 密码哈希 (bcrypt)
  - Token过期管理
  - CSRF防护
  - 输入验证和清理
```

## 输出文件结构

**主要输出**: `src/backend/` 完整后端服务
```yaml
生成内容:
  ✅ 项目配置 (package.json, tsconfig.json, .env)
  ✅ Express服务器 (app.ts, server.ts)
  ✅ Prisma Schema (schema.prisma)
  ✅ API路由 (基于OpenAPI)
  ✅ 控制器和服务 (业务逻辑)
  ✅ 中间件 (认证、验证、错误处理)
  ✅ 测试用例 (Unit + Integration)
  ✅ Docker配置 (Dockerfile, docker-compose)
```

## 代码生成模板

### 控制器模板
```typescript
// controllers/userController.ts
export const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const { page = 1, limit = 20 } = req.query
      const users = await userService.getUsers({ page, limit })
      
      res.json({
        success: true,
        data: users,
        message: 'Users retrieved successfully'
      })
    } catch (error) {
      next(error)
    }
  },
  
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = createUserSchema.parse(req.body)
      const user = await userService.createUser(userData)
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
```

### 服务层模板
```typescript
// services/userService.ts
export const userService = {
  async getUsers({ page, limit }: PaginationParams) {
    const skip = (page - 1) * limit
    
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true
        }
      }),
      prisma.user.count()
    ])
    
    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  },
  
  async createUser(userData: CreateUserData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    })
  }
}
```

### 中间件模板
```typescript
// middleware/auth.ts
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    req.user = await userService.getUserById(decoded.userId)
    
    next()
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}
```

## 测试策略实施

### 单元测试
```yaml
控制器测试:
  - 请求/响应测试
  - 错误处理测试
  - 中间件集成测试

服务层测试:
  - 业务逻辑测试
  - 数据库操作测试
  - 边界条件测试
```

### 集成测试
```yaml
API测试:
  - 端到端API测试
  - 认证授权测试
  - 数据库集成测试
  - 错误场景测试
```

## 数据库设计

### Prisma Schema示例
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // 关联关系
  posts     Post[]
  
  @@map("users")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // 关联关系
  author    User     @relation(fields: [authorId], references: [id])
  
  @@map("posts")
}
```

## Agent协作

**上游输入**:
- ← architect.md (后端架构规范)
- ← product-manager.md (业务需求)

**下游输出**:
- → integration.md (API测试数据)

## 质量标准

- ✅ TypeScript严格模式，0类型错误
- ✅ 单元测试覆盖率≥80%
- ✅ API响应时间<500ms
- ✅ 数据库查询优化
- ✅ 安全最佳实践实施
- ✅ 错误处理全覆盖
- ✅ API文档与实现100%一致
- ✅ 生产环境Docker配置

## 性能优化

```yaml
数据库优化:
  - 索引设计优化
  - 查询语句优化
  - 连接池配置
  - 缓存策略 (Redis)

API优化:
  - 响应压缩
  - 分页查询
  - 字段选择
  - 批量操作优化
```

## 示例用法

```bash
# 基于OpenAPI生成后端
/ut:code/backend

# 包含Redis缓存
/ut:code/backend "redis-cache"

# 微服务架构
/ut:code/backend "microservice"
```

## 最佳实践

1. **分层架构**: 控制器-服务-数据访问清晰分层
2. **类型安全**: 完整TypeScript类型定义
3. **安全实践**: 认证、授权、输入验证
4. **错误处理**: 统一错误处理和日志记录
5. **测试驱动**: TDD开发模式，高测试覆盖率