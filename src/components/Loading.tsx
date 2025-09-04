import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  /** 加载类型 */
  variant?: 'spinner' | 'dots' | 'pulse';
  /** 大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 显示文字 */
  text?: string;
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 背景色主题 */
  theme?: 'light' | 'dark' | 'gradient';
}

const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  text,
  fullscreen = false,
  className,
  theme = 'light'
}) => {
  // 大小映射
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  // 文字大小映射
  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // 背景主题
  const backgroundMap = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50'
  };

  // 文字颜色
  const textColorMap = {
    light: 'text-gray-600',
    dark: 'text-gray-300', 
    gradient: 'text-gray-600'
  };

  // 渲染加载图标
  const renderLoadingIcon = () => {
    const iconClass = cn('mx-auto mb-4', sizeMap[size]);
    
    switch (variant) {
      case 'spinner':
        return <Loader2 className={cn(iconClass, 'animate-spin text-blue-500')} />;
      
      case 'dots':
        return (
          <div className={cn('flex space-x-1 justify-center items-center', iconClass)}>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={cn(iconClass, 'bg-blue-500 rounded-full animate-pulse')}></div>
        );
      
      default:
        return <Loader2 className={cn(iconClass, 'animate-spin text-blue-500')} />;
    }
  };

  // 内容区域
  const content = (
    <div className="text-center">
      {renderLoadingIcon()}
      {text && (
        <p className={cn(textSizeMap[size], textColorMap[theme])}>
          {text}
        </p>
      )}
    </div>
  );

  // 全屏模式
  if (fullscreen) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center',
        backgroundMap[theme],
        className
      )}>
        {content}
      </div>
    );
  }

  // 内联模式
  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      {content}
    </div>
  );
};

// 预设组件
export const FullscreenLoading: React.FC<Omit<LoadingProps, 'fullscreen'>> = (props) => (
  <Loading {...props} fullscreen />
);

export const InlineLoading: React.FC<Omit<LoadingProps, 'fullscreen'>> = (props) => (
  <Loading {...props} />
);

// 带布局的移动端加载组件（考虑底部导航栏）
export const MobileLoading: React.FC<{
  text?: string;
  variant?: LoadingProps['variant'];
  hasBottomNav?: boolean;
}> = ({ text, variant = 'spinner', hasBottomNav = true }) => {
  return (
    <div className={`flex items-center justify-center ${
      hasBottomNav ? 'min-h-[calc(100vh-5rem)]' : 'min-h-screen'
    }`}>
      <div className="text-center">
        <Loading variant={variant} size="md" text={text} />
      </div>
    </div>
  );
};

// 移动端页面级加载组件（不会盖住底部导航栏）
export const MobilePageLoading: React.FC<{
  text?: string;
  variant?: LoadingProps['variant'];
  theme?: LoadingProps['theme'];
}> = ({ text, variant = 'spinner', theme = 'gradient' }) => {
  // 本地背景主题映射
  const localBackgroundMap = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50'
  };

  // 本地文字颜色映射
  const localTextColorMap = {
    light: 'text-gray-600',
    dark: 'text-gray-300', 
    gradient: 'text-gray-600'
  };

  return (
    <div className={cn(
      'flex items-center justify-center',
      'min-h-[calc(100vh-5rem)]', // 减去底部导航栏高度(80px = 5rem)
      localBackgroundMap[theme]
    )}>
      <div className="text-center">
        {variant === 'spinner' && <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />}
        {variant === 'dots' && (
          <div className="flex space-x-1 justify-center items-center h-8 w-8 mx-auto mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
        {variant === 'pulse' && (
          <div className="h-8 w-8 mx-auto mb-4 bg-blue-500 rounded-full animate-pulse"></div>
        )}
        {text && (
          <p className={cn('text-base', localTextColorMap[theme])}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
