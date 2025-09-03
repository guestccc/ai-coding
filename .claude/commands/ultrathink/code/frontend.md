# /ut:code/frontend

**命令描述**: 调用前端开发Agent生成React前端应用
**交互消耗**: 🔴 高消耗 (4-6次)
**激活Agent**: frontend-developer.md

## 命令用法

```bash
/ut:code/frontend [基于UI原型和API规范]
```

## 前置依赖

- ✅ 必须存在: `docs/PRD.md`, `docs/prototype.md`, `docs/openapi.yaml`
- 📋 建议存在: `docs/test-plan.md`

## 执行流程

### 1. 项目脚手架创建
```bash
# Vite + React + TypeScript
npm create vite@latest frontend -- --template react-ts

# 核心依赖安装
npm install react-router-dom @tanstack/react-query
npm install react-hook-form @hookform/resolvers
npm install zustand axios date-fns clsx

# 开发依赖
npm install -D @types/node @vitejs/plugin-react
npm install -D eslint @typescript-eslint/parser
npm install -D prettier eslint-config-prettier
npm install -D @testing-library/react vitest jsdom
```

### 2. 项目结构设计
```
src/frontend/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   ├── forms/          # 表单组件
│   └── layout/         # 布局组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hooks
├── store/              # 状态管理 (Zustand)
├── api/                # API请求层
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
├── styles/             # 全局样式
└── __tests__/          # 测试文件
```

### 3. 核心功能实现
基于@docs/prototype.md实现：

```yaml
基础组件库:
  - Button (variant, size, loading状态)
  - Input/Select/Checkbox (表单控件)
  - Card/Modal/Alert (容器和反馈)
  - Table/Pagination (数据展示)

页面组件:
  - 基于原型设计生成页面结构
  - 响应式布局实现
  - 路由配置和导航

状态管理:
  - Zustand全局状态
  - React Query服务端状态
  - 本地组件状态管理
```

### 4. API集成
基于@docs/openapi.yaml集成：
```yaml
API客户端:
  - Axios配置和拦截器
  - 自动生成API Types
  - React Query Hooks
  - 错误处理机制

认证集成:
  - JWT Token管理
  - 路由守卫
  - 权限控制
```

## 技术栈配置

### React 18 + TypeScript
```yaml
React特性:
  - 函数式组件 + Hooks
  - 严格模式TypeScript
  - 错误边界处理
  - Suspense + 懒加载

TypeScript配置:
  - strict: true
  - 完整类型定义
  - 泛型和高级类型
  - 类型守护
```

### Vite构建系统
```yaml
构建优化:
  - 快速热重载 (HMR)
  - 代码分割
  - 环境变量管理
  - 生产优化构建
```

### Tailwind CSS
```yaml
样式系统:
  - 原子化CSS类
  - 响应式设计
  - 暗色主题支持
  - 自定义设计令牌
```

### 状态管理策略
```yaml
状态分层:
  本地状态: useState (组件内部状态)
  跨组件状态: Zustand (全局状态)
  服务端状态: React Query (数据获取缓存)
  表单状态: React Hook Form (表单处理)
```

## 输出文件结构

**主要输出**: `src/frontend/` 完整前端应用
```yaml
生成内容:
  ✅ 项目配置文件 (vite.config.ts, tsconfig.json)
  ✅ 基础组件库 (UI组件 + 样式)
  ✅ 页面组件 (基于原型设计)
  ✅ API集成层 (类型 + Hooks)
  ✅ 路由配置 (React Router)
  ✅ 状态管理 (Zustand stores)
  ✅ 测试用例 (Unit + Integration)
```

## 组件开发模板

### 基础UI组件
```typescript
// components/ui/Button.tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // variant styles...
      )}
      disabled={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  )
}
```

### API集成Hook
```typescript
// hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
    staleTime: 1000 * 60 * 5, // 5分钟
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## 测试策略实施

### 单元测试
```yaml
组件测试:
  - React Testing Library
  - 用户交互测试
  - 组件状态测试
  - 无障碍性测试

Hook测试:
  - @testing-library/react-hooks
  - 状态管理测试
  - API调用测试
```

### 集成测试
```yaml
页面测试:
  - 用户流程测试
  - API集成测试
  - 路由导航测试
```

## Agent协作

**上游输入**:
- ← ui-designer.md (原型设计规范)
- ← architect.md (前端架构要求)

**下游输出**:
- → integration.md (前端测试数据)

## 质量标准

- ✅ TypeScript严格模式，0类型错误
- ✅ ESLint + Prettier代码规范
- ✅ 单元测试覆盖率≥80%
- ✅ 组件Props有完整类型定义
- ✅ 响应式设计适配所有断点
- ✅ 无障碍性WCAG 2.1 AA级
- ✅ 页面首屏加载<3秒
- ✅ Lighthouse性能评分≥90

## 性能优化

```yaml
代码层面:
  - React.memo组件记忆化
  - useMemo/useCallback避免重复计算
  - 路由懒加载
  - 组件动态导入

构建层面:
  - Tree Shaking移除无用代码
  - 代码分割和预加载
  - 图片懒加载和压缩
  - CSS关键路径优化
```

## 示例用法

```bash
# 基于完整设计生成前端
/ut:code/frontend

# 专注移动端实现
/ut:code/frontend "mobile-first"

# 包含PWA功能
/ut:code/frontend "pwa-enabled"
```

## 最佳实践

1. **组件设计**: 单一职责，高内聚低耦合
2. **类型安全**: 完整TypeScript类型定义
3. **性能优化**: 合理使用memo和缓存机制
4. **用户体验**: Loading状态和错误处理
5. **可维护性**: 清晰的文件结构和命名规范