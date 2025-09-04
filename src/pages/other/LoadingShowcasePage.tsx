import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading, { FullscreenLoading, InlineLoading, MobileLoading } from '@/components/Loading';

const LoadingShowcasePage: React.FC = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const variants: Array<{ name: string; variant: 'spinner' | 'dots' | 'pulse' }> = [
    { name: '旋转器', variant: 'spinner' },
    { name: '圆点', variant: 'dots' },
    { name: '脉冲', variant: 'pulse' }
  ];

  const sizes: Array<{ name: string; size: 'sm' | 'md' | 'lg' }> = [
    { name: '小', size: 'sm' },
    { name: '中', size: 'md' },
    { name: '大', size: 'lg' }
  ];

  const themes: Array<{ name: string; theme: 'light' | 'dark' | 'gradient' }> = [
    { name: '浅色', theme: 'light' },
    { name: '深色', theme: 'dark' },
    { name: '渐变', theme: 'gradient' }
  ];

  if (showFullscreen) {
    return (
      <>
        <FullscreenLoading 
          variant="spinner" 
          size="lg" 
          text="全屏加载示例..." 
          theme="gradient" 
        />
        <Button 
          className="fixed top-4 right-4 z-50" 
          onClick={() => setShowFullscreen(false)}
        >
          关闭全屏
        </Button>
      </>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading 组件展示</h1>
        <p className="text-gray-600 mb-6">
          统一的加载组件，支持多种样式、大小和主题
        </p>
        <Button onClick={() => setShowFullscreen(true)} className="mb-8">
          查看全屏加载效果
        </Button>
      </div>

      {/* 加载样式展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">样式</Badge>
            不同的加载动画样式
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {variants.map(({ name, variant }) => (
            <div key={variant} className="text-center p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-4">{name} ({variant})</h3>
              <Loading variant={variant} size="md" text={`${name}加载中...`} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 大小展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">大小</Badge>
            不同尺寸的加载器
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map(({ name, size }) => (
            <div key={size} className="text-center p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-4">{name}尺寸 ({size})</h3>
              <Loading variant="spinner" size={size} text={`${name}加载中...`} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 主题展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">主题</Badge>
            不同背景主题
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {themes.map(({ name, theme }) => (
            <div key={theme}>
              <h3 className="font-medium mb-2">{name}主题 ({theme})</h3>
              <div className="h-32 rounded-lg overflow-hidden">
                <Loading 
                  variant="spinner" 
                  size="md" 
                  text={`${name}主题加载中...`}
                  theme={theme}
                  fullscreen
                  className="h-full"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 预设组件展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">预设</Badge>
            预设组件展示
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">内联加载 (InlineLoading)</h3>
            <div className="border rounded-lg p-4">
              <InlineLoading variant="dots" text="处理中..." />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">移动端加载 (MobileLoading)</h3>
            <div className="border rounded-lg h-64 relative overflow-hidden">
              <MobileLoading text="加载移动端页面..." variant="pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用示例代码 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">代码</Badge>
            使用示例
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
            <div>{`// 全屏加载`}</div>
            <div>{`<FullscreenLoading variant="spinner" size="lg" text="加载中..." theme="gradient" />`}</div>
            
            <div className="mt-4">{`// 移动端加载`}</div>
            <div>{`<MobileLayout>`}</div>
            <div>{`  <MobileLoading text="加载用户信息..." variant="spinner" />`}</div>
            <div>{`</MobileLayout>`}</div>
            
            <div className="mt-4">{`// 内联加载`}</div>
            <div>{`<InlineLoading variant="dots" text="处理中..." />`}</div>
            
            <div className="mt-4">{`// 自定义加载`}</div>
            <div>{`<Loading variant="pulse" size="md" text="自定义..." theme="dark" fullscreen />`}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingShowcasePage;
