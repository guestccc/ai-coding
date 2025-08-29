# API服务架构说明

## 目录结构

```
src/
├── utils/
│   └── request.ts          # axios封装和拦截器
├── services/
│   ├── index.ts            # 统一导出
│   ├── homeApi.ts          # 首页相关接口
│   ├── cccApi.ts           # CCC页面相关接口
│   └── commonApi.ts        # 通用接口
└── types/
    └── api.ts              # TypeScript类型定义
```

## 架构特点

### 1. 统一的请求封装 (`utils/request.ts`)
- 统一的axios实例配置
- 请求拦截器：自动添加通用请求头、token等
- 响应拦截器：统一错误处理、日志记录
- 支持请求/响应拦截和错误处理

### 2. 按页面分组的API服务
- `homeApi.ts`: 首页相关接口
- `cccApi.ts`: CCC页面相关接口  
- `commonApi.ts`: 通用接口（上传、系统配置等）

### 3. TypeScript类型支持
- 完整的类型定义
- API响应类型约束
- 参数类型检查

## 使用方式

### 在页面中使用

```typescript
import { homeApi, cccApi, commonApi } from '../services';

// 首页数据
const fetchHomeData = async () => {
  try {
    const result = await homeApi.getHomeData();
    console.log(result.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

// CCC页面接口
const fetchGraySwitch = async () => {
  try {
    const result = await cccApi.getGraySwitch();
    console.log(result.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

// 通用接口
const uploadFile = async (file: File) => {
  try {
    const result = await commonApi.uploadFile(file);
    console.log(result.data.url);
  } catch (error) {
    console.error('上传失败:', error);
  }
};
```

### 添加新的API服务

1. 在 `services/` 目录下创建新的API文件
2. 在 `types/api.ts` 中添加相关类型定义
3. 在 `services/index.ts` 中导出

```typescript
// services/userApi.ts
import request from '../utils/request';
import { ApiResponse, UserInfo } from '../types/api';

export const userApi = {
  getUserProfile: (): Promise<ApiResponse<UserInfo>> => {
    return request.get('/api/user/profile');
  },
  
  updateUserProfile: (data: Partial<UserInfo>): Promise<ApiResponse<UserInfo>> => {
    return request.put('/api/user/profile', data);
  }
};
```

## 拦截器功能

### 请求拦截器
- 自动添加通用请求头
- 添加认证token
- 请求日志记录

### 响应拦截器
- 统一错误处理
- 响应日志记录
- 状态码处理

## 错误处理

所有API请求都会自动进行错误处理：

```typescript
try {
  const result = await homeApi.getHomeData();
  // 成功处理
} catch (error) {
  // 错误已在拦截器中统一处理
  // 这里可以添加页面特定的错误处理
}
```

## 类型安全

所有API都有完整的TypeScript类型支持：

```typescript
// 自动类型推断
const result = await homeApi.getHomeData();
// result.data 的类型是 HomeData

// 参数类型检查
const formData: CccFormData = {
  name: 'test',
  description: 'test description',
  config: {}
};
await cccApi.submitCccForm(formData);
```

