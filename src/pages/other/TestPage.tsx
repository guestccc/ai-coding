import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Shield, CheckCircle, Layers, FileText, Settings, User } from 'lucide-react';

const TestPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otpValue, setOtpValue] = useState("");

  const handleOtpComplete = (value: string) => {
    console.log("OTP输入完成:", value);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    console.log("选择的日期:", selectedDate);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">组件测试页面</h1>
          <p className="text-muted-foreground">
            测试 shadcn UI 的 InputOTP、Calendar 和 Tabs 组件
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* InputOTP 测试区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                InputOTP 组件测试
              </CardTitle>
              <CardDescription>
                一次性密码输入组件，支持多种格式
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 6位数字验证码 */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">6位验证码</h3>
                <InputOTP 
                  maxLength={6} 
                  value={otpValue} 
                  onChange={(value) => {
                    setOtpValue(value);
                    if (value.length === 6) {
                      handleOtpComplete(value);
                    }
                  }}
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    当前值: {otpValue || "未输入"}
                  </span>
                  {otpValue.length === 6 && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      完成
                    </Badge>
                  )}
                </div>
              </div>

              {/* 4位数字PIN */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">4位PIN码</h3>
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setOtpValue("")}
                >
                  清空
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setOtpValue("123456")}
                >
                  填入示例
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar 测试区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Calendar 组件测试
              </CardTitle>
              <CardDescription>
                日期选择器组件，支持单选和多选
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 日历组件 */}
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                />
              </div>

              {/* 选择结果显示 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">选择的日期:</h3>
                <div className="p-3 bg-muted rounded-lg">
                  {date ? (
                    <div className="space-y-1">
                      <p className="font-mono text-sm">
                        {date.toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long'
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        ISO: {date.toISOString().split('T')[0]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">未选择日期</p>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDate(new Date())}
                >
                  今天
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDate(undefined)}
                >
                  清空
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs 测试区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Tabs 组件测试
            </CardTitle>
            <CardDescription>
              标签页组件，支持受控和非受控模式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 基础 Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">基础标签页</h3>
              <Tabs defaultValue="account" className="w-full" onValueChange={() => {}}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">账户</TabsTrigger>
                  <TabsTrigger value="password">密码</TabsTrigger>
                  <TabsTrigger value="settings">设置</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">账户信息</h4>
                    <p className="text-sm text-muted-foreground">
                      管理你的账户设置和个人信息。
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">用户名: demo@example.com</span>
                      </div>
                      <Button size="sm">编辑资料</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="password" className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">密码设置</h4>
                    <p className="text-sm text-muted-foreground">
                      更改你的密码以保护账户安全。
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">当前密码</label>
                        <input 
                          type="password" 
                          className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                          placeholder="输入当前密码"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">新密码</label>
                        <input 
                          type="password" 
                          className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                          placeholder="输入新密码"
                        />
                      </div>
                      <Button size="sm">更新密码</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">通用设置</h4>
                    <p className="text-sm text-muted-foreground">
                      自定义你的应用体验。
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">推送通知</p>
                          <p className="text-xs text-muted-foreground">接收重要更新</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">自动更新</p>
                          <p className="text-xs text-muted-foreground">自动安装更新</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <Button size="sm">保存设置</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* 垂直 Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">垂直标签页</h3>
              <Tabs defaultValue="overview" className="flex gap-4" onValueChange={() => {}}>
                <TabsList className="flex flex-col h-auto w-48">
                  <TabsTrigger value="overview" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    概览
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    分析
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    报告
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1">
                  <TabsContent value="overview" className="mt-0">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">概览仪表板</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        查看你的应用使用情况和关键指标。
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted rounded">
                          <p className="text-2xl font-bold">1,234</p>
                          <p className="text-xs text-muted-foreground">总用户</p>
                        </div>
                        <div className="p-3 bg-muted rounded">
                          <p className="text-2xl font-bold">98.5%</p>
                          <p className="text-xs text-muted-foreground">在线率</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-0">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">分析详情</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        深入了解用户行为和应用性能。
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">页面浏览量</span>
                          <span className="text-sm font-medium">12,345</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">平均会话时长</span>
                          <span className="text-sm font-medium">4m 32s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">跳出率</span>
                          <span className="text-sm font-medium">23.4%</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reports" className="mt-0">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">报告生成</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        生成和下载各种数据报告。
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          用户活动报告
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          性能分析报告
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          收入统计报告
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* 受控 Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">受控标签页</h3>
              <p className="text-xs text-muted-foreground">演示程序化控制标签页</p>
              <ControlledTabsDemo />
            </div>
          </CardContent>
        </Card>

        {/* 组件信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>组件信息</CardTitle>
            <CardDescription>关于这些组件的技术细节</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  InputOTP
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 基于 input-otp 库构建</li>
                  <li>• 支持自定义长度</li>
                  <li>• 内置焦点管理</li>
                  <li>• 支持粘贴操作</li>
                  <li>• 完全可访问</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Calendar
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 基于 react-day-picker 库</li>
                  <li>• 支持单选和多选模式</li>
                  <li>• 内置国际化支持</li>
                  <li>• 可自定义样式</li>
                  <li>• 键盘导航支持</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Tabs
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 支持受控和非受控模式</li>
                  <li>• 键盘导航支持</li>
                  <li>• 灵活的布局选项</li>
                  <li>• 可自定义样式</li>
                  <li>• 无障碍访问优化</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 受控 Tabs 演示组件
const ControlledTabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  
  const tabs = [
    { value: "tab1", label: "Tab 1", content: "这是第一个标签页的内容" },
    { value: "tab2", label: "Tab 2", content: "这是第二个标签页的内容" },
    { value: "tab3", label: "Tab 3", content: "这是第三个标签页的内容" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setActiveTab("tab1")}>切换到 Tab 1</Button>
        <Button size="sm" onClick={() => setActiveTab("tab2")}>切换到 Tab 2</Button>
        <Button size="sm" onClick={() => setActiveTab("tab3")}>切换到 Tab 3</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="p-4 border rounded-lg">
              <p className="text-sm">{tab.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                当前激活: {activeTab}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TestPage;
