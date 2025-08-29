// OpenWeatherMap API 类型定义
// 基于 OpenAPI 3.0.2 规范

// 基础响应类型
export interface WeatherApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// 坐标信息
export interface Coord {
  lon: number; // 经度
  lat: number; // 纬度
}

// 天气信息
export interface Weather {
  id: number; // 天气条件ID
  main: string; // 天气参数组 (Rain, Snow, Extreme等)
  description: string; // 天气描述
  icon: string; // 天气图标ID
}

// 主要天气数据
export interface Main {
  temp: number; // 温度 (Kelvin/Celsius/Fahrenheit)
  pressure: number; // 大气压力 (hPa)
  humidity: number; // 湿度 (%)
  temp_min: number; // 最低温度
  temp_max: number; // 最高温度
  sea_level?: number; // 海平面大气压力 (hPa)
  grnd_level?: number; // 地面大气压力 (hPa)
}

// 风力信息
export interface Wind {
  speed: number; // 风速 (m/s 或 mph)
  deg: number; // 风向 (度)
}

// 云量信息
export interface Clouds {
  all: number; // 云量 (%)
}

// 降雨信息
export interface Rain {
  '3h'?: number; // 3小时降雨量
  '1h'?: number; // 1小时降雨量
}

// 降雪信息
export interface Snow {
  '3h'?: number; // 3小时降雪量
  '1h'?: number; // 1小时降雪量
}

// 系统信息
export interface Sys {
  type?: number; // 内部参数
  id?: number; // 内部参数
  message?: number; // 内部参数
  country: string; // 国家代码 (GB, JP等)
  sunrise: number; // 日出时间 (Unix UTC)
  sunset: number; // 日落时间 (Unix UTC)
}

// 完整的天气响应数据
export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string; // 内部参数
  main: Main;
  visibility: number; // 能见度 (米)
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number; // 数据计算时间 (Unix UTC)
  sys: Sys;
  id: number; // 城市ID
  name: string; // 城市名称
  cod: number; // 内部参数
}

// 请求参数类型
export interface WeatherQueryParams {
  q?: string; // 城市名称 (例如: London)
  id?: string; // 城市ID (例如: 2172797)
  lat?: string; // 纬度 (例如: 35)
  lon?: string; // 经度 (例如: 139)
  zip?: string; // 邮政编码 (例如: 95050,us)
  units?: 'standard' | 'metric' | 'imperial'; // 单位
  lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw'; // 语言
  mode?: 'json' | 'xml' | 'html'; // 响应格式
  appid: string; // API密钥 (必需)
}

// 错误响应
export interface WeatherErrorResponse {
  cod: string; // 错误代码
  message: string; // 错误消息
}

// 成功响应
export interface WeatherSuccessResponse extends WeatherData {}

// 通用天气响应
export type WeatherResponse = WeatherSuccessResponse | WeatherErrorResponse;
