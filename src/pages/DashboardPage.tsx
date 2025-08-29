import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  CreditCard,
  Download,
  Eye,
  ShoppingCart,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CalendarDays,
  Clock,
  Bell,
  Settings
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // 模拟数据
  const recentSales = [
    {
      name: "张小明",
      email: "zhang@example.com",
      amount: "+¥1,999.00",
      avatar: "ZXM"
    },
    {
      name: "李晓红",
      email: "li@example.com", 
      amount: "+¥399.00",
      avatar: "LXH"
    },
    {
      name: "王大力",
      email: "wang@example.com",
      amount: "+¥299.00",
      avatar: "WDL"
    },
    {
      name: "赵美丽",
      email: "zhao@example.com",
      amount: "+¥99.00",
      avatar: "ZML"
    },
    {
      name: "孙强",
      email: "sun@example.com",
      amount: "+¥199.00",
      avatar: "SQ"
    }
  ];

  const products = [
    { name: "iPhone 15 Pro", sales: 234, revenue: "¥234,000", trend: "+12%" },
    { name: "MacBook Air M3", sales: 123, revenue: "¥184,500", trend: "+8%" },
    { name: "iPad Pro", sales: 89, revenue: "¥89,000", trend: "-3%" },
    { name: "Apple Watch", sales: 156, revenue: "¥46,800", trend: "+15%" },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">仪表板</h2>
          <div className="flex items-center space-x-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <Button>
              <Download className="mr-2 h-4 w-4" />
              下载报告
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports">报告</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* 关键指标卡片 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    总收入
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥45,231.89</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                    +20.1% 比上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    订阅用户
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                    +180.1% 比上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    销售订单
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                    +19% 比上月
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    活跃用户
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1 text-red-600" />
                    -2% 比上周
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 主要内容区域 */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              {/* 图表区域 */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    销售概览
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[350px] flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border-2 border-dashed border-border">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-lg font-medium text-muted-foreground">销售趋势图表</p>
                      <p className="text-sm text-muted-foreground">这里可以集成 Chart.js 或 Recharts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 最近销售 */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>最近销售</CardTitle>
                  <CardDescription>
                    本月您完成了265笔销售。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {sale.avatar}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {sale.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 产品性能 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>热门产品</CardTitle>
                  <CardDescription>
                    按销售额排序的产品表现
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} 销量</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.revenue}</p>
                          <p className={`text-sm flex items-center ${
                            product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.trend.startsWith('+') ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {product.trend}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 快速操作 */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                  <CardDescription>
                    常用功能快捷入口
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    新建订单
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    添加客户
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    查看报告
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    系统设置
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    页面浏览量
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24,319</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% 比昨天
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    转化率
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.8% 比上周
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    平均停留时间
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4m 32s</div>
                  <p className="text-xs text-muted-foreground">
                    +1m 12s 比上周
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    跳出率
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23.4%</div>
                  <p className="text-xs text-muted-foreground">
                    -2.1% 比上周
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>用户行为分析</CardTitle>
                <CardDescription>
                  详细的用户行为数据和洞察
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-lg font-medium text-muted-foreground">用户行为图表</p>
                    <p className="text-sm text-muted-foreground">热力图、漏斗分析等</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    月度报告
                  </CardTitle>
                  <CardDescription>
                    生成本月的详细业务报告
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    下载月度报告
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    趋势分析
                  </CardTitle>
                  <CardDescription>
                    市场趋势和预测分析报告
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    下载趋势报告
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    用户报告
                  </CardTitle>
                  <CardDescription>
                    用户活动和参与度分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    下载用户报告
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知中心
                </CardTitle>
                <CardDescription>
                  管理您的通知设置和消息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">新订单通知</p>
                      <p className="text-sm text-muted-foreground">当有新订单时发送通知</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">库存警告</p>
                      <p className="text-sm text-muted-foreground">库存不足时发送提醒</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">周报推送</p>
                      <p className="text-sm text-muted-foreground">每周发送业务总结</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
