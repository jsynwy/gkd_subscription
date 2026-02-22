# 项目架构文档

## 项目概述

GKD订阅规则项目是一个用于生成GKD（搞快点）应用订阅规则的工具。GKD是一款Android应用，可以自动跳过应用的开屏广告。

## 项目结构

```
.
├── src/                          # 源码目录
│   ├── apps/                     # 应用规则目录
│   │   ├── com.xingin.xhs.ts     # 小红书规则
│   │   ├── tv.danmaku.bili.ts    # 哔哩哔哩规则
│   │   └── ...                   # 其他应用规则
│   ├── subscription.ts           # 订阅配置
│   ├── globalGroups.ts           # 全局规则组
│   └── categories.ts             # 分类配置
├── dist/                         # 构建输出目录
│   ├── gkd.json5                 # 生成的订阅文件
│   ├── gkd.version.json5         # 版本信息
│   ├── CHANGELOG.md              # 变更日志
│   └── README.md                 # 订阅说明文档
├── docs/                         # 文档目录
│   ├── @architecture.md          # 架构文档
│   ├── @project.md               # 项目说明
│   └── @progress.md              # 进度记录
├── scripts/                      # 构建脚本
│   ├── build.ts                  # 构建脚本
│   └── check.ts                  # 检查脚本
├── package.json                  # 项目依赖配置
└── tsconfig.json                 # TypeScript 配置
```

## 核心概念

### 1. 应用规则（App Rules）

每个应用规则定义在一个独立的 `.ts` 文件中，位于 `src/apps/` 目录下。

**文件命名规范**：使用应用包名作为文件名，例如 `com.xingin.xhs.ts`

**基本结构**：
```typescript
import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.example.app',    // 应用包名
  name: '示例应用',          // 应用显示名称
  groups: [                  // 规则组数组
    {
      key: 1,                // 规则组唯一标识
      name: '开屏广告',       // 规则组名称
      // ... 其他配置
    },
  ],
});
```

### 2. 规则组（Rule Groups）

规则组是应用规则的核心，定义了如何匹配和跳过广告。

**开屏广告规则组标准配置**：
```typescript
{
  key: 1,
  name: '开屏广告',
  fastQuery: true,        // 启用快速查询
  matchTime: 10000,       // 匹配时间窗口10秒
  actionMaximum: 1,       // 最大执行1次
  resetMatch: 'app',      // 应用级重置
  priorityTime: 10000,    // 优先级时间
  rules: [
    {
      matches: '[text*="跳过"][text.length<10][visibleToUser=true]',
    },
  ],
}
```

### 3. 选择器语法

GKD 使用类似 CSS 选择器的语法来匹配界面元素。

**常用选择器**：
- `[text*="跳过"]` - 文字包含"跳过"
- `[text.length<10]` - 文字长度小于10
- `[visibleToUser=true]` - 对用户可见
- `[vid="skip"]` - view id 为 "skip"
- `[desc="关闭"]` - 描述为 "关闭"

**组合条件**：
```typescript
'[vid="skip" || vid="count_down" || text*="跳过" || text^="Skip"][visibleToUser=true]'
```

## 构建流程

### 1. 构建脚本 (`scripts/build.ts`)

构建脚本的主要流程：
1. 扫描 `src/apps/` 目录下的所有 `.ts` 文件
2. 导入每个应用规则模块
3. 验证规则的有效性
4. 将所有规则合并成一个 JSON 对象
5. 输出到 `dist/gkd.json5`

### 2. 检查脚本 (`scripts/check.ts`)

检查脚本的主要功能：
1. 验证所有应用规则的语法
2. 检查规则的唯一性（key 不能重复）
3. 验证选择器语法的正确性

## 最佳实践

### 1. 开屏广告规则设计

**必须配置**：
- `fastQuery: true` - 启用快速查询提高性能
- `matchTime: 10000` - 10秒匹配窗口足够覆盖大多数开屏广告
- `resetMatch: 'app'` - 应用级重置，每次启动应用时重新匹配
- `priorityTime: 10000` - 高优先级确保及时处理

**推荐配置**：
- `matchRoot: true` - 对于某些应用（如YouTube、哔哩哔哩、豆瓣）需要匹配根节点
- `actionMaximum: 2` - 有些开屏广告需要点击两次（倒计时+跳过）
- `actionCd: 500` - 点击间隔500ms避免重复点击失败

**选择器设计**：
```typescript
// 基础版本：只匹配中文跳过
matches: '[text*="跳过"][text.length<10][visibleToUser=true]'

// 进阶版本：支持多种语言和控件类型
matches: '[vid="skip" || vid="count_down" || text*="跳过" || text^="Skip" || text^="SKIP"][visibleToUser=true]'
```

### 2. 文件组织

- 每个应用一个文件，文件名为包名
- 文件按包名字母顺序排列便于查找
- 新应用规则文件直接放入 `src/apps/` 目录

### 3. 版本控制

- 每次修改后运行 `pnpm run build` 重新构建
- 提交时包含 `src/` 和 `dist/` 的变更
- 使用清晰的提交信息描述变更内容

## 常见问题

### Q1: 为什么某些应用的开屏广告无法跳过？

可能原因：
1. 应用使用了特殊技术显示广告（如SurfaceView、WebView等）
2. 跳过按钮的标识方式特殊，现有选择器无法匹配
3. 应用有反自动化机制

解决方案：
1. 使用 GKD 的"快照"功能分析广告界面元素
2. 根据分析结果调整选择器
3. 可能需要添加 `matchRoot: true` 或调整其他配置

### Q2: 为什么添加了 `matchRoot: true`？

某些应用（如YouTube、哔哩哔哩、豆瓣）的开屏广告显示在根节点上，如果不设置 `matchRoot: true`，GKD 可能无法正确匹配到广告元素。

### Q3: 如何选择 `actionMaximum` 的值？

- `actionMaximum: 1` - 大多数开屏广告只需要点击一次
- `actionMaximum: 2` - 某些开屏广告需要点击两次（如先点击倒计时，再点击跳过）

如果不确定，可以先设置为1，如果发现无法跳过再改为2。
