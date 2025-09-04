import React from 'react';
import AppRoutes from './router';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/globals.css';
import './styles/themes.css';
import './styles/App.less';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
