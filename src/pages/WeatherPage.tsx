import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { weatherApi, weatherApiMethods, WeatherApiService } from '../services';
import { WeatherData } from '../types/weatherApi';
import '../styles/WeatherPage.less';

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [cityName, setCityName] = useState('Beijing');
  const [apiKey, setApiKey] = useState('');

  // 获取天气数据
  const fetchWeather = async () => {
    if (!apiKey.trim()) {
      setError('请输入API密钥');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const result = await weatherApi.getWeatherByCity(cityName, apiKey, {
        units: 'metric',
        lang: 'zh_cn'
      });
      
      if (result.data && 'cod' in result.data && result.data.cod === 200) {
        setWeatherData(result.data as WeatherData);
      } else {
        setError('获取天气数据失败');
      }
    } catch (err: any) {
      setError(`请求失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 使用便捷方法获取北京天气
  const fetchBeijingWeather = async () => {
    if (!apiKey.trim()) {
      setError('请输入API密钥');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const result = await weatherApiMethods.getBeijingWeather(apiKey);
      if (result.data && 'cod' in result.data && result.data.cod === 200) {
        setWeatherData(result.data as WeatherData);
        setCityName('Beijing');
      } else {
        setError('获取北京天气失败');
      }
    } catch (err: any) {
      setError(`请求失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 使用服务类获取天气
  const fetchWeatherWithService = async () => {
    if (!apiKey.trim()) {
      setError('请输入API密钥');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const weatherService = new WeatherApiService(apiKey);
      const result = await weatherService.getWeatherByCity(cityName, {
        units: 'metric',
        lang: 'zh_cn'
      });
      
      if (result.data && 'cod' in result.data && result.data.cod === 200) {
        setWeatherData(result.data as WeatherData);
      } else {
        setError('获取天气数据失败');
      }
    } catch (err: any) {
      setError(`请求失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      <div className="container">
        <h1 className="title">天气查询</h1>
        <p className="subtitle">OpenWeatherMap API 演示</p>

        <div className="api-config">
          <h2>API配置</h2>
          <div className="input-group">
            <label>API密钥:</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="请输入OpenWeatherMap API密钥"
              className="api-input"
            />
          </div>
          <div className="input-group">
            <label>城市名称:</label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="例如: Beijing, Shanghai, Guangzhou"
              className="city-input"
            />
          </div>
        </div>

        <div className="api-actions">
          <h2>API调用方式</h2>
          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={fetchWeather}
              disabled={loading}
            >
              {loading ? '请求中...' : '基础API调用'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={fetchBeijingWeather}
              disabled={loading}
            >
              {loading ? '请求中...' : '便捷方法(北京)'}
            </button>
            <button
              className="btn btn-primary"
              onClick={fetchWeatherWithService}
              disabled={loading}
            >
              {loading ? '请求中...' : '服务类调用'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <h3>错误信息:</h3>
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="weather-result">
            <h2>天气信息</h2>
            <div className="weather-card">
              <div className="weather-header">
                <h3>{weatherData.name}, {weatherData.sys.country}</h3>
                <p className="weather-description">
                  {weatherData.weather[0]?.description}
                </p>
              </div>
              
              <div className="weather-main">
                <div className="temperature">
                  <span className="temp-value">{Math.round(weatherData.main.temp)}°C</span>
                  <div className="temp-range">
                    <span>最低: {Math.round(weatherData.main.temp_min)}°C</span>
                    <span>最高: {Math.round(weatherData.main.temp_max)}°C</span>
                  </div>
                </div>
                
                <div className="weather-details">
                  <div className="detail-item">
                    <span className="label">湿度:</span>
                    <span className="value">{weatherData.main.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">气压:</span>
                    <span className="value">{weatherData.main.pressure} hPa</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">风速:</span>
                    <span className="value">{weatherData.wind.speed} m/s</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">能见度:</span>
                    <span className="value">{weatherData.visibility / 1000} km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="navigation">
          <Link to="/" className="nav-link">
            返回首页
          </Link>
          <Link to="/ccc" className="nav-link">
            前往CCC页面
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
