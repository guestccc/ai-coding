# OpenWeatherMap API 集成说明

## 概述

本项目已成功集成了 OpenWeatherMap API，提供了完整的 TypeScript 类型定义和多种调用方式。

## 文件结构

```
src/
├── types/
│   └── weatherApi.ts          # 天气API类型定义
├── services/
│   └── weatherApi.ts          # 天气API服务
├── pages/
│   └── WeatherPage.tsx        # 天气查询页面
└── styles/
    └── WeatherPage.less       # 天气页面样式
```

## 类型定义 (`types/weatherApi.ts`)

### 主要类型

- `WeatherData` - 完整的天气数据
- `WeatherQueryParams` - 查询参数
- `WeatherResponse` - API响应
- `Coord`, `Weather`, `Main`, `Wind`, `Clouds`, `Rain`, `Snow`, `Sys` - 详细数据结构

### 使用示例

```typescript
import { WeatherData, WeatherQueryParams } from '../types/weatherApi';

// 定义查询参数
const params: WeatherQueryParams = {
  q: 'Beijing',
  appid: 'your-api-key',
  units: 'metric',
  lang: 'zh_cn'
};

// 使用天气数据
const weatherData: WeatherData = response.data;
console.log(weatherData.main.temp); // 温度
console.log(weatherData.weather[0].description); // 天气描述
```

## API服务 (`services/weatherApi.ts`)

### 三种调用方式

#### 1. 基础API调用

```typescript
import { weatherApi } from '../services';

// 根据城市名称获取天气
const result = await weatherApi.getWeatherByCity('Beijing', 'your-api-key', {
  units: 'metric',
  lang: 'zh_cn'
});

// 根据坐标获取天气
const result = await weatherApi.getWeatherByCoordinates('39.9042', '116.4074', 'your-api-key');

// 根据城市ID获取天气
const result = await weatherApi.getWeatherByCityId('1816670', 'your-api-key');

// 根据邮政编码获取天气
const result = await weatherApi.getWeatherByZipCode('100000,cn', 'your-api-key');
```

#### 2. 便捷方法

```typescript
import { weatherApiMethods } from '../services';

// 获取北京天气
const beijingWeather = await weatherApiMethods.getBeijingWeather('your-api-key');

// 获取上海天气
const shanghaiWeather = await weatherApiMethods.getShanghaiWeather('your-api-key');

// 获取广州天气
const guangzhouWeather = await weatherApiMethods.getGuangzhouWeather('your-api-key');
```

#### 3. 服务类

```typescript
import { WeatherApiService } from '../services';

// 创建服务实例
const weatherService = new WeatherApiService('your-api-key');

// 获取天气数据
const result = await weatherService.getWeatherByCity('Beijing', {
  units: 'metric',
  lang: 'zh_cn'
});

// 根据坐标获取天气
const result = await weatherService.getWeatherByCoordinates('39.9042', '116.4074');
```

## 页面演示 (`pages/WeatherPage.tsx`)

### 功能特性

- ✅ API密钥配置
- ✅ 城市名称输入
- ✅ 三种API调用方式演示
- ✅ 实时天气数据显示
- ✅ 错误处理和加载状态
- ✅ 响应式设计

### 访问方式

访问 http://localhost:3000/weather 查看天气查询页面

### 使用步骤

1. 输入 OpenWeatherMap API 密钥
2. 输入城市名称（默认：Beijing）
3. 选择API调用方式
4. 查看天气结果

## API参数说明

### 必需参数

- `appid` - API密钥（从 https://openweathermap.org/api 获取）

### 可选参数

- `q` - 城市名称
- `id` - 城市ID
- `lat` - 纬度
- `lon` - 经度
- `zip` - 邮政编码
- `units` - 单位（standard/metric/imperial）
- `lang` - 语言（支持30+种语言）
- `mode` - 响应格式（json/xml/html）

### 单位说明

- `standard` - 开尔文温度
- `metric` - 摄氏度
- `imperial` - 华氏度

### 语言支持

支持30多种语言，包括：
- `zh_cn` - 简体中文
- `zh_tw` - 繁体中文
- `en` - 英语
- `ja` - 日语
- `ko` - 韩语
- 等等...

## 错误处理

```typescript
try {
  const result = await weatherApi.getWeatherByCity('Beijing', 'your-api-key');
  if (result.data && 'cod' in result.data && result.data.cod === 200) {
    // 成功处理
    console.log(result.data);
  } else {
    // 错误处理
    console.error('API返回错误:', result.data);
  }
} catch (error) {
  // 网络错误或其他错误
  console.error('请求失败:', error);
}
```

## 获取API密钥

1. 访问 https://openweathermap.org/api
2. 注册账号
3. 订阅免费计划
4. 获取API密钥

## 注意事项

1. **API限制**: 免费计划每分钟60次请求
2. **城市名称**: 建议使用英文城市名称
3. **坐标精度**: 建议使用小数点后4位精度
4. **错误处理**: 始终检查响应状态码
5. **类型安全**: 使用TypeScript类型确保数据安全

## 扩展功能

可以基于现有架构轻松添加：

- 天气预报（5天/16天）
- 历史天气数据
- 空气质量数据
- 地理编码服务
- 更多天气相关API

## 示例响应

```json
{
  "coord": {
    "lon": 116.4074,
    "lat": 39.9042
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "晴天",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 25.6,
    "pressure": 1013,
    "humidity": 45,
    "temp_min": 22.1,
    "temp_max": 28.9
  },
  "wind": {
    "speed": 3.2,
    "deg": 180
  },
  "name": "Beijing",
  "cod": 200
}
```
