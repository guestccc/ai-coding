# 移动端Web前端工程

一个基于React 18 + TypeScript + Webpack的移动端Web前端工程。

## 技术栈

- **构建工具**: Webpack 5
- **框架**: React 18
- **语言**: TypeScript
- **样式**: Less
- **路由**: React Router DOM
- **状态管理**: Redux Toolkit
- **HTTP客户端**: Axios
- **代码质量**: ESLint + Prettier
- **包管理**: Yarn

## 项目结构

```
├── public/
│   └── index.html          # HTML模板
├── src/
│   ├── pages/              # 页面组件
│   │   ├── HomePage.tsx    # 首页 (Hello World!)
│   │   └── CccPage.tsx     # CCC页面 (Hello CCC)
│   ├── store/              # Redux状态管理
│   │   ├── index.ts        # Store配置
│   │   └── counterSlice.ts # 计数器Slice
│   ├── services/           # 服务层
│   │   └── api.ts          # Axios配置
│   ├── styles/             # 样式文件
│   │   ├── global.less     # 全局样式
│   │   ├── App.less        # 应用样式
│   │   ├── HomePage.less   # 首页样式
│   │   └── CccPage.less    # CCC页面样式
│   ├── App.tsx             # 主应用组件
│   └── index.tsx           # 应用入口
├── package.json            # 项目配置
├── webpack.config.js       # Webpack配置
├── tsconfig.json           # TypeScript配置
├── .eslintrc.js            # ESLint配置
└── .prettierrc             # Prettier配置
```

## 功能特性

- ✅ 响应式设计，适配移动端
- ✅ 现代化UI设计，渐变色彩
- ✅ 页面路由导航
- ✅ Redux状态管理示例
- ✅ TypeScript类型安全
- ✅ 代码质量检查
- ✅ 热重载开发体验

## 快速开始

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
yarn dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
yarn build
```

### 代码检查

```bash
# ESLint检查
yarn lint

# ESLint自动修复
yarn lint:fix

# 代码格式化
yarn format

# TypeScript类型检查
yarn type-check
```

## 页面说明

### 首页 (/)
- 显示 "Hello World!"
- 展示Redux计数器状态
- 提供导航到CCC页面的链接

### CCC页面 (/ccc)
- 显示 "Hello CCC"
- 提供Redux计数器操作按钮
- 提供返回首页的链接

## 开发说明

### 添加新页面
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/styles/` 目录下创建对应的样式文件
3. 在 `src/App.tsx` 中添加路由配置

### 添加新的Redux状态
1. 在 `src/store/` 目录下创建新的slice
2. 在 `src/store/index.ts` 中注册reducer

### 样式开发
- 使用Less预处理器
- 支持嵌套语法
- 响应式设计优先

## 浏览器支持

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 许可证

MIT
