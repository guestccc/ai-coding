import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { increment, decrement } from '../../store/counterSlice';
import { cccApi } from '../../services';
import '../../styles/CccPage.less';

const CccPage: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  const handleApiRequest = async () => {
    setLoading(true);
    setResponse('');
    
    try {
      const result = await cccApi.getGraySwitch();
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error: any) {
      setResponse(`请求失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ccc-page">
      <div className="container">
        <h1 className="title">Hello CCC</h1>
        <p className="subtitle">这是第二个页面</p>
        
        <div className="counter-section">
          <h2>Redux计数器操作</h2>
          <p className="counter">当前计数: {count}</p>
          <div className="counter-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => dispatch(increment())}
            >
              增加
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => dispatch(decrement())}
            >
              减少
            </button>
          </div>
        </div>

        <div className="api-section">
          <h2>API请求测试</h2>
          <button 
            className="btn btn-primary"
            onClick={handleApiRequest}
            disabled={loading}
          >
            {loading ? '请求中...' : '请求接口'}
          </button>
          
          {response && (
            <div className="response-container">
              <h3>响应结果:</h3>
              <pre className="response-text">{response}</pre>
            </div>
          )}
        </div>
        
        <div className="navigation">
          <Link to="/" className="nav-link">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CccPage;
