import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { homeApi } from '../services';
import '../styles/HomePage.less';

const HomePage: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 示例：获取首页数据
  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const result = await homeApi.getHomeData();
      setHomeData(result.data);
    } catch (error) {
      console.error('获取首页数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">Hello World!</h1>
        <p className="subtitle">欢迎来到移动端Web应用</p>
        
        <div className="counter-section">
          <h2>Redux计数器示例</h2>
          <p className="counter">当前计数: {count}</p>
        </div>

        <div className="api-section">
          <h2>API服务示例</h2>
          <button 
            className="btn btn-primary"
            onClick={fetchHomeData}
            disabled={loading}
          >
            {loading ? '加载中...' : '获取首页数据'}
          </button>
          
          {homeData && (
            <div className="response-container">
              <h3>首页数据:</h3>
              <pre className="response-text">{JSON.stringify(homeData, null, 2)}</pre>
            </div>
          )}
        </div>
        
        <div className="navigation">
          <Link to="/ccc" className="nav-link">
            前往CCC页面
          </Link>
          <Link to="/weather" className="nav-link">
            天气查询
          </Link>
          <Link to="/login" className="nav-link">
            登录页面
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
