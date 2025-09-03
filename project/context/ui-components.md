# 健身管理系统 - UI组件清单

## 1. 基础组件

### 1.1 按钮组件 (Button)
```yaml
variants:
  - primary: 主要操作按钮
  - secondary: 次要操作按钮
  - outline: 轮廓按钮
  - ghost: 幽灵按钮
  - destructive: 危险操作按钮

sizes:
  - sm: 小按钮 (32px)
  - md: 中等按钮 (40px) 
  - lg: 大按钮 (48px)
  - icon: 图标按钮 (40px)

states:
  - default: 默认状态
  - hover: 悬停状态
  - active: 激活状态
  - disabled: 禁用状态
  - loading: 加载状态
```

### 1.2 输入组件 (Input)
```yaml
types:
  - text: 文本输入
  - email: 邮箱输入
  - password: 密码输入
  - number: 数字输入
  - tel: 电话输入

variants:
  - default: 默认输入框
  - filled: 填充式输入框
  - unstyled: 无样式输入框

features:
  - 前缀图标
  - 后缀图标
  - 清除按钮
  - 错误状态
  - 成功状态
```

### 1.3 表单组件
```yaml
Checkbox: 复选框
  - sizes: sm, md, lg
  - states: checked, indeterminate, disabled

Radio: 单选框
  - group support: 单选组
  - sizes: sm, md, lg

Switch: 开关
  - sizes: sm, md, lg
  - states: on, off, disabled

Select: 下拉选择
  - single select: 单选
  - multi select: 多选
  - searchable: 可搜索
  - creatable: 可创建新选项
```

## 2. 布局组件

### 2.1 容器组件
```yaml
Card: 卡片容器
  - variants: default, elevated, filled, outline
  - sizes: sm, md, lg
  - features: header, footer, image support

Container: 布局容器
  - responsive: 响应式宽度
  - centered: 居中布局
  - padded: 内边距控制

Grid: 网格布局
  - columns: 1-12列
  - gap: 间距控制
  - responsive: 响应式列数

Stack: 堆叠布局
  - direction: horizontal, vertical
  - spacing: 间距控制
  - alignment: 对齐方式
```

### 2.2 分隔组件
```yaml
Divider: 分隔线
  - orientation: horizontal, vertical
  - variants: solid, dashed, dotted

Separator: 分隔符
  - decorative: 装饰性分隔
  - orientation: horizontal, vertical
```

## 3. 导航组件

### 3.1 主要导航
```yaml
Tabs: 选项卡
  - variants: default, underlined, pills
  - orientation: horizontal, vertical
  - sizes: sm, md, lg

NavigationMenu: 导航菜单
  - responsive: 移动端适配
  - mega menu: 大型菜单支持
  - keyboard navigation: 键盘导航

Breadcrumb: 面包屑
  - separator: 分隔符自定义
  - responsive: 响应式折叠
```

### 3.2 次级导航
```yaml
Pagination: 分页
  - sizes: sm, md, lg
  - variants: default, outline, ghost
  - features: page size selector

Sidebar: 侧边栏
  - variants: collapsed, expanded
  - responsive: 移动端抽屉式
  - nested: 嵌套导航支持

Drawer: 抽屉
  - placement: left, right, top, bottom
  - sizes: sm, md, lg, full
  - overlay: 遮罩层控制
```

## 4. 数据展示组件

### 4.1 列表组件
```yaml
List: 列表
  - variants: default, bordered, striped
  - sizes: sm, md, lg
  - features: selection, actions

Table: 表格
  - variants: default, bordered, striped
  - sizes: sm, md, lg
  - features: sorting, filtering, pagination
  - responsive: 移动端适配

DataTable: 数据表格
  - advanced features: 列调整, 行展开, 批量操作
  - server-side: 服务端分页和排序
```

### 4.2 信息展示
```yaml
Badge: 徽章
  - variants: default, secondary, outline, destructive
  - sizes: sm, md
  - shapes: rounded, square

Avatar: 头像
  - sizes: xs, sm, md, lg, xl
  - variants: default, rounded, square
  - features: fallback, group

Tooltip: 工具提示
  - placement: 12个方向
  - delay: 显示延迟控制
  - content: 富文本支持
```

## 5. 反馈组件

### 5.1 提示组件
```yaml
Alert: 警告提示
  - variants: default, destructive, success, warning
  - sizes: sm, md, lg
  - features: icon, dismissible

Toast: 轻提示 (Sonner)
  - positions: top-left, top-right, bottom-left, bottom-right
  - variants: default, success, error, warning, info
  - durations: 可配置显示时间

Progress: 进度条
  - variants: default, success, warning, destructive
  - sizes: sm, md, lg
  - types: linear, circular
```

### 5.2 对话框组件
```yaml
Dialog: 对话框
  - sizes: sm, md, lg, xl
  - variants: default, alert, confirmation
  - features: overlay, close button

AlertDialog: 警告对话框
  - destructive actions: 危险操作确认
  - variants: default, destructive

Popover: 弹出框
  - placement: 12个方向
  - variants: default, filled
  - features: arrow, close button
```

## 6. 高级组件

### 6.1 图表组件
```yaml
Chart: 基础图表
  - types: line, bar, pie, scatter
  - responsive: 响应式尺寸
  - themes: light, dark

ProgressChart: 进度图表
  - types: radial, linear
  - variants: default, success, warning
```

### 6.2 功能组件
```yaml
Calendar: 日历
  - modes: single, multiple, range
  - variants: default, compact
  - features: time selection, disabled dates

DatePicker: 日期选择器
  - variants: default, range
  - formats: 多日期格式支持
  - localization: 多语言支持

TimePicker: 时间选择器
  - formats: 12h, 24h
  - precision: minutes, seconds
```

### 6.3 媒体组件
```yaml
AspectRatio: 宽高比容器
  - ratios: 1:1, 4:3, 16:9, 21:9

Carousel: 轮播图
  - autoplay: 自动播放
  - indicators: 指示器
  - navigation: 导航按钮
```

## 7. 移动端专用组件

### 7.1 底部导航
```yaml
BottomNavigation: 底部导航栏
  - items: 3-5个导航项
  - variants: labeled, icon-only
  - badges: 徽章提示
```

### 7.2 手势组件
```yaml
Swipeable: 可滑动组件
  - directions: left, right, up, down
  - thresholds: 滑动阈值
  - actions: 滑动操作菜单

PullToRefresh: 下拉刷新
  - indicators: 自定义指示器
  - thresholds: 刷新阈值
```

### 7.3 键盘组件
```yaml
VirtualKeyboard: 虚拟键盘
  - types: numeric, alphabetic, special
  - themes: light, dark
```

## 8. 业务专用组件

### 8.1 训练相关组件
```yaml
ExerciseCard: 训练动作卡片
  - states: not-started, in-progress, completed
  - metrics: 重量、次数、组数显示
  - actions: 开始、暂停、完成

WorkoutTimer: 训练计时器
  - modes: countdown, stopwatch
  - intervals: 组间休息计时
  - presets: 常用时间预设

ProgressRing: 进度环
  - sizes: sm, md, lg
  - variants: primary, success, warning
```

### 8.2 数据统计组件
```yaml
StatsCard: 数据统计卡片
  - variants: default, trend-up, trend-down
  - metrics: 数值、百分比、变化趋势

ChartCard: 图表卡片
  - header: 标题和操作按钮
  - footer: 图例和说明
  - responsive: 响应式图表
```

### 8.3 社交组件
```yaml
SocialButton: 社交登录按钮
  - providers: wechat, apple, google, facebook
  - sizes: sm, md, lg

ShareSheet: 分享面板
  - platforms: wechat, moments, qq, weibo
  - types: link, image, text
```

## 9. 工具组件

### 9.1 工具类组件
```yaml
Skeleton: 骨架屏
  - variants: text, circle, rectangle
  - animation: pulse, wave
  - responsive: 响应式骨架

Portal: 门户组件
  - target: 指定渲染目标
  - preserve: 保持DOM结构

FocusTrap: 焦点陷阱
  - autoFocus: 自动聚焦
  - returnFocus: 返回焦点
```

### 9.2 功能类组件
```yaml
ScrollArea: 滚动区域
  - types: auto, always, scroll
  - orientations: vertical, horizontal
  - features: scrollbar styling

Resizable: 可调整大小
  - directions: horizontal, vertical, both
  - handles: 调整手柄
  - constraints: 最小最大尺寸
```

## 10. 组件状态管理

### 10.1 加载状态
```yaml
Loading states:
  - skeleton: 骨架屏加载
  - spinner: 旋转加载指示器
  - progress: 进度条加载
  - placeholder: 占位符加载
```

### 10.2 错误状态
```yaml
Error states:
  - empty: 空数据状态
  - error: 错误状态
  - offline: 离线状态
  - not-found: 未找到状态
```

### 10.3 成功状态
```yaml
Success states:
  - completed: 完成状态
  - success: 成功状态
  - confirmed: 确认状态
```

## 11. 组件属性规范

### 11.1 通用属性
```yaml
size: 尺寸控制 (sm, md, lg)
variant: 样式变体 (default, outline, etc.)
disabled: 禁用状态
loading: 加载状态
className: 自定义类名
style: 内联样式
```

### 11.2 事件属性
```yaml
onClick: 点击事件
onChange: 变化事件
onFocus: 聚焦事件
onBlur: 失焦事件
onKeyDown: 键盘事件
```

### 11.3 无障碍属性
```yaml
aria-label: 无障碍标签
aria-describedby: 描述引用
aria-hidden: 隐藏状态
tabIndex: Tab键顺序
role: ARIA角色
```

## 12. 组件使用指南

### 12.1 导入规范
```typescript
// 正确导入方式
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// 避免整体导入
// import * as UI from '@/components/ui' // 不推荐
```

### 12.2 组合使用
```tsx
// 组件组合示例
<Card>
  <CardHeader>
    <CardTitle>训练计划</CardTitle>
  </CardHeader>
  <CardContent>
    <Progress value={75} />
  </CardContent>
  <CardFooter>
    <Button>开始训练</Button>
  </CardFooter>
</Card>
```

### 12.3 响应式设计
```tsx
// 移动端优先设计
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">内容</div>
  <div className="w-full md:w-1/2">内容</div>
</div>
```

---

**文档版本**: v1.0
**最后更新**: 2025-09-02
**负责人**: 前端开发团队