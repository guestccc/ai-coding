import request from '../utils/request';
import { 
  WeatherApiResponse, 
  WeatherData, 
  WeatherQueryParams, 
  WeatherResponse 
} from '../types/weatherApi';

// OpenWeatherMap API 服务
export const weatherApi = {
  /**
   * 获取当前天气数据
   * @param params 查询参数
   * @returns 天气数据
   */
  getCurrentWeather: (params: WeatherQueryParams): Promise<WeatherApiResponse<WeatherResponse>> => {
    return request.get('/weather', { params });
  },

  /**
   * 根据城市名称获取天气
   * @param cityName 城市名称
   * @param appid API密钥
   * @param options 其他选项
   * @returns 天气数据
   */
  getWeatherByCity: (
    cityName: string, 
    appid: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> => {
    const params: WeatherQueryParams = {
      q: cityName,
      appid,
      ...options
    };
    return request.get('/weather', { params });
  },

  /**
   * 根据城市ID获取天气
   * @param cityId 城市ID
   * @param appid API密钥
   * @param options 其他选项
   * @returns 天气数据
   */
  getWeatherByCityId: (
    cityId: string, 
    appid: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> => {
    const params: WeatherQueryParams = {
      id: cityId,
      appid,
      ...options
    };
    return request.get('/weather', { params });
  },

  /**
   * 根据坐标获取天气
   * @param lat 纬度
   * @param lon 经度
   * @param appid API密钥
   * @param options 其他选项
   * @returns 天气数据
   */
  getWeatherByCoordinates: (
    lat: string, 
    lon: string, 
    appid: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> => {
    const params: WeatherQueryParams = {
      lat,
      lon,
      appid,
      ...options
    };
    return request.get('/weather', { params });
  },

  /**
   * 根据邮政编码获取天气
   * @param zipCode 邮政编码
   * @param appid API密钥
   * @param options 其他选项
   * @returns 天气数据
   */
  getWeatherByZipCode: (
    zipCode: string, 
    appid: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> => {
    const params: WeatherQueryParams = {
      zip: zipCode,
      appid,
      ...options
    };
    return request.get('/weather', { params });
  }
};

// 便捷方法
export const weatherApiMethods = {
  /**
   * 获取北京天气 (示例)
   * @param appid API密钥
   * @returns 北京天气数据
   */
  getBeijingWeather: (appid: string) => {
    return weatherApi.getWeatherByCity('Beijing', appid, { units: 'metric', lang: 'zh_cn' });
  },

  /**
   * 获取上海天气 (示例)
   * @param appid API密钥
   * @returns 上海天气数据
   */
  getShanghaiWeather: (appid: string) => {
    return weatherApi.getWeatherByCity('Shanghai', appid, { units: 'metric', lang: 'zh_cn' });
  },

  /**
   * 获取广州天气 (示例)
   * @param appid API密钥
   * @returns 广州天气数据
   */
  getGuangzhouWeather: (appid: string) => {
    return weatherApi.getWeatherByCity('Guangzhou', appid, { units: 'metric', lang: 'zh_cn' });
  }
};

// 天气API服务类
export class WeatherApiService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * 获取当前天气
   * @param params 查询参数
   * @returns 天气数据
   */
  async getCurrentWeather(params: Omit<WeatherQueryParams, 'appid'>): Promise<WeatherApiResponse<WeatherResponse>> {
    return weatherApi.getCurrentWeather({ ...params, appid: this.apiKey });
  }

  /**
   * 根据城市名称获取天气
   * @param cityName 城市名称
   * @param options 其他选项
   * @returns 天气数据
   */
  async getWeatherByCity(
    cityName: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> {
    return weatherApi.getWeatherByCity(cityName, this.apiKey, options);
  }

  /**
   * 根据坐标获取天气
   * @param lat 纬度
   * @param lon 经度
   * @param options 其他选项
   * @returns 天气数据
   */
  async getWeatherByCoordinates(
    lat: string, 
    lon: string, 
    options?: {
      units?: 'standard' | 'metric' | 'imperial';
      lang?: 'ar' | 'bg' | 'ca' | 'cz' | 'de' | 'el' | 'en' | 'fa' | 'fi' | 'fr' | 'gl' | 'hr' | 'hu' | 'it' | 'ja' | 'kr' | 'la' | 'lt' | 'mk' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'se' | 'sk' | 'sl' | 'es' | 'tr' | 'ua' | 'vi' | 'zh_cn' | 'zh_tw';
      mode?: 'json' | 'xml' | 'html';
    }
  ): Promise<WeatherApiResponse<WeatherResponse>> {
    return weatherApi.getWeatherByCoordinates(lat, lon, this.apiKey, options);
  }
}
