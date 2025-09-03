# /ut:generate/proto

**命令描述**: 调用产品经理Agent生成原型设计文档
**交互消耗**: 🟡 中消耗 (3-4次)
**激活Agent**: proto-designer.md

## 命令用法

```bash
/ut:generate/ui [基于PRD和API规范]
```

## 前置依赖

- ✅ 必须存在: `docs/PRD.md`
- 📋 建议存在: `docs/architecture.md`, `docs/openapi.yaml`

## 执行流程

### 1. 需求分析阶段
- **输入**: @docs/PRD.md + @docs/openapi.yaml
- **处理**: 提取用户角色、功能需求、交互流程、原型图梳理
- **输出**: 原型图页面拆分、界面原型图描述

### 3. 移动端设计规范
```yaml
屏幕尺寸适配:
  iPhone SE: 375x667px (4.7英寸)
  iPhone 13/14: 390x844px (6.1英寸)
  iPhone Pro Max: 428x926px (6.7英寸)
  Android主流: 360x640px - 412x915px

设计约束:
  安全区域: 顶部44px, 底部34px (iPhone)
  最小触控区域: 44x44px
  字体大小: 最小16px (避免缩放)

## 输出文件

**主要输出**: `docs/prototype.md`
```yaml
文档结构:
  1. 原型图页面拆分
  2. 界面原型图描述
```

**次要输出**:
- `docs/design-system.md` - 设计系统文档
- `project/context/ui-components.md` - 组件清单
- `assets/design/` - 设计资源文件夹

## 核心组件库

使用 shadcn/ui 完整组件库：
```yaml
基础组件:
  Button, Input, Label, Textarea, Select, Checkbox, Radio, Switch
  Slider, Toggle, ToggleGroup, Avatar, Badge, Skeleton

布局组件:  
  Card, Container, Grid, Stack, Divider, AspectRatio
  ScrollArea, Separator, Sheet, Resizable

导航组件:
  NavigationMenu, Tabs, Breadcrumb, Pagination
  Sidebar, Drawer, DropdownMenu, Menubar

交互组件:
  Dialog, AlertDialog, Popover, Tooltip, HoverCard
  Accordion, Collapsible, ContextMenu

数据展示:
  Table, DataTable, Calendar, Chart, Progress
  Sonner (Toast), Command, Combobox

表单组件:
  Form, FormField, FormItem, FormLabel, FormMessage
  FormDescription, InputOTP, DatePicker, TimePicker

高级组件:
  Carousel, ResizablePanel, Virtualizer
  FileUpload, RichTextEditor, CodeEditor
```
