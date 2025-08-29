import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { 
  CreditCard, 
  Activity, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Heart,
  Eye,
  Download,
  Share,
  Settings
} from 'lucide-react';

const ComponentShowcasePage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otpValue, setOtpValue] = useState("");

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">shadcn/ui 组件展示</h1>
          <p className="text-xl text-muted-foreground">
            完整的组件使用示例和最佳实践
          </p>
        </div>

        {/* Card 组件使用示例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Card 组件使用方法</h2>
          
          {/* 基础卡片 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 简单卡片 */}
            <Card>
              <CardHeader>
                <CardTitle>基础卡片</CardTitle>
                <CardDescription>
                  这是一个简单的卡片示例
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  卡片内容区域可以放置任何内容，包括文本、图片、表单等。
                </p>
              </CardContent>
            </Card>

            {/* 带图标的卡片 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  总收入
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% 比上月
                </p>
              </CardContent>
            </Card>

            {/* 带脚注的卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  活跃用户
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% 比上月
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">
                  查看详情
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* 统计卡片组 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总销售额</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% 比上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">订阅数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% 比上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">销售额</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% 比上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">当前活跃</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 自1小时前
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 登录表单示例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">登录表单示例</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* 简洁登录表单 */}
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>登录账户</CardTitle>
                <CardDescription>
                  输入您的邮箱和密码登录
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    邮箱
                  </label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    密码
                  </label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">登录</Button>
              </CardContent>
            </Card>

            {/* 带验证码的登录表单 */}
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>安全登录</CardTitle>
                <CardDescription>
                  使用验证码进行安全登录
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    手机号
                  </label>
                  <Input id="phone" placeholder="请输入手机号" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    验证码
                  </label>
                  <InputOTP 
                    maxLength={6} 
                    value={otpValue} 
                    onChange={setOtpValue}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">获取验证码</Button>
                  <Button className="flex-1">登录</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 仪表板布局示例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">仪表板布局</h2>
          
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={() => {}}>
            <TabsList>
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="analytics">分析</TabsTrigger>
              <TabsTrigger value="reports">报告</TabsTrigger>
              <TabsTrigger value="notifications">通知</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      总销售额
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% 比上月
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      订阅数
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% 比上月
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      销售额
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% 比上月
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      当前活跃
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 自1小时前
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>概览</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded">
                      <p className="text-muted-foreground">图表区域</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>最近销售</CardTitle>
                    <CardDescription>
                      本月您完成了265笔销售。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Olivia Martin
                          </p>
                          <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Jackson Lee
                          </p>
                          <p className="text-sm text-muted-foreground">
                            jackson.lee@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                      </div>
                      <div className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Isabella Nguyen
                          </p>
                          <p className="text-sm text-muted-foreground">
                            isabella.nguyen@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$299.00</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>分析数据</CardTitle>
                  <CardDescription>
                    详细的用户行为和业务分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>这里显示分析数据...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* 各种卡片样式 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">更多卡片样式</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 产品卡片 */}
            <Card>
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">产品名称</CardTitle>
                  <Badge>新品</Badge>
                </div>
                <CardDescription className="mb-4">
                  这是一个很棒的产品描述，说明产品的主要特点和优势。
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">¥99</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      加入购物车
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 用户资料卡片 */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto mb-4"></div>
                <CardTitle>张三</CardTitle>
                <CardDescription>前端开发工程师</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>zhangsan@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+86 138 0013 8000</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>北京市朝阳区</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  发送邮件
                </Button>
                <Button className="flex-1">
                  查看资料
                </Button>
              </CardFooter>
            </Card>

            {/* 统计卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  网站分析
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </CardTitle>
                <CardDescription>
                  过去30天的数据概览
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">页面浏览量</span>
                  </div>
                  <span className="font-semibold">24,321</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">独立访客</span>
                  </div>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">下载次数</span>
                  </div>
                  <span className="font-semibold">456</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Share className="mr-2 h-4 w-4" />
                  查看详细报告
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentShowcasePage;
