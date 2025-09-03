import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme, themeColors } from '@/hooks/useTheme';
import { Palette, Sparkles, Eye } from 'lucide-react';

const ThemeShowcasePage: React.FC = () => {
  const { theme, themeColor } = useTheme();

  const currentThemeInfo = themeColors.find(color => color.value === themeColor);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">主题展示中心</h1>
          <p className="text-xl text-muted-foreground">
            查看不同主题色和明暗模式的效果
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Palette className="h-3 w-3" />
              当前主题: {currentThemeInfo?.name}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Eye className="h-3 w-3" />
              模式: {theme === 'light' ? '明亮' : '暗黑'}
            </Badge>
          </div>
        </div>

        {/* 主题色展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              主题色效果展示
            </CardTitle>
            <CardDescription>
              体验不同主题色在各种组件上的效果
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 按钮展示 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">按钮组件</h3>
              <div className="flex flex-wrap gap-3">
                <Button>主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </div>
            </div>

            {/* 输入框展示 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">输入组件</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <Input placeholder="普通输入框" />
                <Input placeholder="聚焦查看主题色" className="focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            {/* 徽章展示 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">徽章组件</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>默认徽章</Badge>
                <Badge variant="secondary">次要徽章</Badge>
                <Badge variant="outline">轮廓徽章</Badge>
                <Badge variant="destructive">危险徽章</Badge>
              </div>
            </div>

            {/* 卡片嵌套展示 */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">卡片组件</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">特色功能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      这是一个展示主题色效果的示例卡片
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">响应式设计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      所有组件都支持明暗主题自动切换
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">个性定制</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      12种预设主题色，随心选择
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 主题色预览网格 */}
        <Card>
          <CardHeader>
            <CardTitle>所有主题色预览</CardTitle>
            <CardDescription>
              点击右上角的调色板图标切换主题色
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {themeColors.map((color) => (
                <div
                  key={color.value}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    themeColor === color.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className="w-full h-8 rounded"
                      style={{ backgroundColor: color.color }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium">{color.name}</p>
                      <p className="text-xs text-muted-foreground">{color.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 使用说明 */}
        <Card>
          <CardHeader>
            <CardTitle>如何使用主题切换</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">明暗模式切换</h4>
                <p className="text-sm text-muted-foreground">
                  点击右上角的月亮/太阳图标可以在明亮和暗黑模式之间切换
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">主题色切换</h4>
                <p className="text-sm text-muted-foreground">
                  点击右上角的调色板图标，选择你喜欢的主题色
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                💡 <strong>提示:</strong> 你的主题设置会自动保存到本地存储，下次访问时会记住你的选择
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeShowcasePage;
