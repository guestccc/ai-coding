import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  Settings,
  ChevronDown,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  User,
  Lock,
  Bell,
  Home,
  Package,
  ShoppingCart,
  CreditCard as CreditCardIcon,
  FileText,
  BarChart3,
  Layers,
  Zap,
  Moon,
  Sun,
  Palette,
  Volume2,
  VolumeX,
  ArrowUp
} from 'lucide-react';

const ComponentShowcasePage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otpValue, setOtpValue] = useState("");
  const [progress, setProgress] = useState(13);
  const [volume, setVolume] = useState([50]);
  const [isChecked, setIsChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option-one");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // 组件导航数据
  const componentSections = [
    { id: 'buttons', name: '按钮组件', icon: Zap },
    { id: 'cards', name: '卡片组件', icon: CreditCard },
    { id: 'forms', name: '表单组件', icon: FileText },
    { id: 'navigation', name: '导航组件', icon: Bell },
    { id: 'feedback', name: '反馈组件', icon: Bell },
    { id: 'data-display', name: '数据展示', icon: BarChart3 },
    { id: 'overlay', name: '覆盖层组件', icon: Layers },
    { id: 'layout', name: '布局组件', icon: Package },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="flex">
        {/* 侧边导航 */}
        <div className="w-64 border-r bg-background p-4 space-y-2 sticky top-0 h-screen overflow-y-auto">
          <div className="pb-4 border-b">
            <h2 className="text-lg font-semibold">组件导航</h2>
            <p className="text-sm text-muted-foreground">快速定位到对应组件</p>
          </div>
          <nav className="space-y-1">
            {componentSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors scroll-smooth"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <section.icon className="h-4 w-4" />
                {section.name}
              </a>
            ))}
          </nav>
          
          {/* 回到顶部按钮 */}
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              回到顶部
            </Button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 p-8 space-y-12 overflow-y-auto h-screen">
        {/* 页面标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">shadcn/ui 组件展示</h1>
          <p className="text-xl text-muted-foreground">
            完整的组件使用示例和最佳实践
          </p>
        </div>

          {/* 按钮组件 */}
          <section id="buttons" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">按钮组件</h2>
              <p className="text-muted-foreground">各种样式的按钮组件示例</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>按钮变体</CardTitle>
                <CardDescription>不同的按钮样式和状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>默认按钮</Button>
                  <Button variant="secondary">次要按钮</Button>
                  <Button variant="destructive">危险按钮</Button>
                  <Button variant="outline">轮廓按钮</Button>
                  <Button variant="ghost">幽灵按钮</Button>
                  <Button variant="link">链接按钮</Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">小按钮</Button>
                  <Button size="default">默认大小</Button>
                  <Button size="lg">大按钮</Button>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button disabled>禁用按钮</Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    带图标按钮
                  </Button>
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    搜索
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 卡片组件 */}
          <section id="cards" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">卡片组件</h2>
              <p className="text-muted-foreground">用于展示内容的卡片容器</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>基础卡片</CardTitle>
                  <CardDescription>这是一个简单的卡片示例</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  卡片内容区域可以放置任何内容，包括文本、图片、表单等。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总收入</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% 比上月</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  活跃用户
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% 比上月</p>
              </CardContent>
              <CardFooter>
                  <Button size="sm" className="w-full">查看详情</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

          {/* 表单组件 */}
          <section id="forms" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">表单组件</h2>
              <p className="text-muted-foreground">各种表单输入组件</p>
            </div>
          
          <div className="grid gap-6 md:grid-cols-2">
              <Card>
              <CardHeader>
                  <CardTitle>基础输入组件</CardTitle>
                  <CardDescription>文本输入、选择器等</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="请输入邮箱" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="textarea">文本区域</Label>
                    <Textarea id="textarea" placeholder="请输入内容..." />
                </div>
                <div className="space-y-2">
                    <Label>选择器</Label>
                    <Select value={selectedValue} onValueChange={setSelectedValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择一个选项" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">选项 1</SelectItem>
                        <SelectItem value="option2">选项 2</SelectItem>
                        <SelectItem value="option3">选项 3</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>验证码输入</Label>
                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>选择组件</CardTitle>
                  <CardDescription>复选框、单选框、开关等</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={isChecked}
                      onCheckedChange={(checked) => setIsChecked(checked === true)}
                    />
                    <Label htmlFor="terms">同意服务条款</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>单选组</Label>
                    <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">选项一</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">选项二</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="airplane-mode" 
                      checked={isSwitchOn}
                      onCheckedChange={setIsSwitchOn}
                    />
                    <Label htmlFor="airplane-mode">飞行模式</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>音量控制</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

          {/* 导航组件 */}
          <section id="navigation" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">导航组件</h2>
              <p className="text-muted-foreground">标签页、面包屑等导航组件</p>
            </div>
            
                <Card>
              <CardHeader>
                <CardTitle>标签页</CardTitle>
                <CardDescription>内容分组的标签页组件</CardDescription>
                  </CardHeader>
                  <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">账户</TabsTrigger>
                    <TabsTrigger value="password">密码</TabsTrigger>
                    <TabsTrigger value="settings">设置</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">姓名</Label>
                      <Input id="name" placeholder="请输入姓名" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <Input id="username" placeholder="请输入用户名" />
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">当前密码</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">新密码</Label>
                      <Input id="new" type="password" />
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">主题</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择主题" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">浅色</SelectItem>
                          <SelectItem value="dark">深色</SelectItem>
                          <SelectItem value="system">系统</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
                  </CardContent>
                </Card>
          </section>

          {/* 反馈组件 */}
          <section id="feedback" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">反馈组件</h2>
              <p className="text-muted-foreground">警告、进度条、骨架屏等</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                <CardHeader>
                  <CardTitle>警告提示</CardTitle>
                  <CardDescription>不同类型的警告信息</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      这是一个信息提示，用于显示一般信息。
                    </AlertDescription>
                  </Alert>
                  
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      这是一个错误提示，用于显示错误信息。
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-green-200 bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      这是一个成功提示，用于显示成功信息。
                    </AlertDescription>
                  </Alert>
                  </CardContent>
                </Card>
                
                <Card>
                <CardHeader>
                  <CardTitle>进度和加载</CardTitle>
                  <CardDescription>进度条和骨架屏组件</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>进度条</Label>
                    <Progress value={progress} className="w-full" />
                    <Button 
                      size="sm" 
                      onClick={() => setProgress(progress + 10)}
                      disabled={progress >= 100}
                    >
                      增加进度
                    </Button>
              </div>
              
                  <div className="space-y-2">
                    <Label>骨架屏</Label>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          </section>

          {/* 数据展示组件 */}
          <section id="data-display" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">数据展示</h2>
              <p className="text-muted-foreground">表格、头像、徽章等</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>表格组件</CardTitle>
                  <CardDescription>数据表格展示</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>姓名</TableHead>
                        <TableHead>邮箱</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>张三</TableCell>
                        <TableCell>zhangsan@example.com</TableCell>
                        <TableCell><Badge>活跃</Badge></TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">编辑</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>李四</TableCell>
                        <TableCell>lisi@example.com</TableCell>
                        <TableCell><Badge variant="secondary">离线</Badge></TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">编辑</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

            <Card>
                <CardHeader>
                  <CardTitle>头像和徽章</CardTitle>
                  <CardDescription>用户头像和状态徽章</CardDescription>
              </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">张三</p>
                      <p className="text-sm text-muted-foreground">前端开发</p>
                </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge>默认</Badge>
                    <Badge variant="secondary">次要</Badge>
                    <Badge variant="destructive">危险</Badge>
                    <Badge variant="outline">轮廓</Badge>
                </div>
              </CardContent>
            </Card>
            </div>
          </section>

          {/* 覆盖层组件 */}
          <section id="overlay" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">覆盖层组件</h2>
              <p className="text-muted-foreground">对话框、弹出框、工具提示等</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>对话框</CardTitle>
                  <CardDescription>模态对话框组件</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>打开对话框</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>确认操作</DialogTitle>
                        <DialogDescription>
                          您确定要执行此操作吗？此操作无法撤销。
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          取消
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>
                          确认
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>弹出框和工具提示</CardTitle>
                  <CardDescription>弹出框和工具提示组件</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">选择日期</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">悬停查看提示</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>这是一个工具提示</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 布局组件 */}
          <section id="layout" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">布局组件</h2>
              <p className="text-muted-foreground">手风琴、分隔符等布局组件</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>手风琴组件</CardTitle>
                <CardDescription>可折叠的内容区域</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>什么是 shadcn/ui？</AccordionTrigger>
                    <AccordionContent>
                      shadcn/ui 是一个基于 Radix UI 和 Tailwind CSS 构建的组件库，
                      提供了高质量的 React 组件，可以自由定制和组合。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>如何安装组件？</AccordionTrigger>
                    <AccordionContent>
                      使用 shadcn CLI 可以轻松添加组件：npx shadcn@latest add button
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>支持哪些主题？</AccordionTrigger>
                    <AccordionContent>
                      支持浅色、深色主题，并且可以自定义 CSS 变量来创建自己的主题。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>分隔符</CardTitle>
                <CardDescription>用于分隔内容的组件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">水平分隔符</h4>
                  <p className="text-sm text-muted-foreground">
                    分隔符用于在视觉上分隔内容
                  </p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">分隔后的内容</h4>
                  <p className="text-sm text-muted-foreground">
                    这是分隔符后的内容区域
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
          </div>
      </div>
    </div>
  );
};

export default ComponentShowcasePage;
