# GKD 订阅规则开发仓库

本项目是 GKD (搞快点) 的第三方订阅规则开发仓库，用于自动生成跳过 Android 应用开屏广告和弹窗广告的规则。

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
├── scripts/                      # 构建脚本
├── package.json                  # 项目依赖配置
└── tsconfig.json                 # TypeScript 配置
```

## 开发环境

### 系统要求

- **Node.js**: >= 22 (必需，用于 WasmGc 校验正则表达式)
- **pnpm**: >= 9 (推荐包管理器)
- **Git**: 用于版本控制

### 环境安装

```bash
# 克隆仓库
git clone https://github.com/jsynwy/gkd_subscription.git
cd gkd_subscription

# 安装依赖
pnpm install

# 如果网络问题，使用国内镜像
pnpm install --registry=https://registry.npmmirror.com
```

## 开发指南

### 1. 添加新应用规则

在 `src/apps/` 目录下创建 `{packageName}.ts` 文件：

```typescript
import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.example.app',           // 应用包名
  name: '示例应用',                 // 应用显示名称
  groups: [
    {
      key: 1,                       // 规则组唯一标识
      name: '开屏广告',              // 规则组名称
      desc: '跳过启动页广告',       // 规则描述
      fastQuery: true,              // 启用快速查询
      matchTime: 10000,             // 匹配时间窗口(ms)
      actionMaximum: 1,             // 最大执行次数
      resetMatch: 'app',            // 重置时机: app/activity
      priorityTime: 10000,          // 优先级时间
      rules: [
        {
          // 匹配规则: 查找包含"跳过"文字且可见的按钮
          matches: '[text*="跳过"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 2,
      name: '弹窗广告',
      desc: '关闭各种弹窗广告',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      rules: [
        {
          // 指定Activity ID
          activityIds: ['com.example.app.MainActivity'],
          // 匹配关闭按钮: vid/描述/文字
          matches: '[vid="close" || desc="关闭" || text="关闭"][visibleToUser=true]',
        },
      ],
    },
  ],
});
```

### 2. 常用字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 应用包名，如 `com.xingin.xhs` |
| `name` | string | 应用显示名称 |
| `groups` | array | 规则组数组 |
| `key` | number | 规则组唯一标识，同一应用内不能重复 |
| `name` | string | 规则组名称，如 "开屏广告" |
| `desc` | string | 规则描述，说明规则的作用 |
| `fastQuery` | boolean | 是否启用快速查询，建议开启 |
| `matchTime` | number | 匹配时间窗口，单位毫秒，默认10000 |
| `actionMaximum` | number | 最大执行次数，默认1 |
| `resetMatch` | string | 重置时机：`app`(应用级) / `activity`(页面级) |
| `priorityTime` | number | 优先级时间，开屏广告建议设置 |
| `rules` | array | 匹配规则数组 |
| `matches` | string | 选择器表达式，用于匹配目标元素 |
| `activityIds` | array | 指定规则生效的Activity ID |

### 3. 选择器语法

GKD 使用类似 CSS 选择器的语法来匹配界面元素：

```typescript
// 匹配文字包含"跳过"的元素
'[text*="跳过"]'

// 匹配文字长度小于10的元素
'[text.length<10]'

// 匹配可见的元素
'[visibleToUser=true]'

// 组合条件
'[text*="跳过"][text.length<10][visibleToUser=true]'

// 匹配 vid (view id)
'[vid="close"]'

// 匹配描述
'[desc="关闭"]'

// 或条件
'[vid="close" || desc="关闭" || text="关闭"]'

// 父子关系
'@[clickable=true] >(1,2) [text="关闭"]'
```

### 4. 构建与发布

```bash
# 构建订阅文件
pnpm run build

# 代码检查
pnpm run check

# 格式化代码
pnpm run format
```

构建后的文件位于 `dist/` 目录：
- `gkd.json5` - 订阅主文件
- `gkd.version.json5` - 版本信息
- `CHANGELOG.md` - 变更日志
- `README.md` - 订阅说明

### 5. 提交规范

提交信息格式：`类型: 描述`

常用类型：
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式（不影响代码运行的变动）
- `refactor`: 重构
- `chore`: 构建过程或辅助工具的变动

## 订阅信息

- **订阅地址**: `https://raw.githubusercontent.com/jsynwy/gkd_subscription/main/dist/gkd.json5`
- **镜像加速**: `https://fastly.jsdelivr.net/gh/jsynwy/gkd_subscription@main/dist/gkd.json5`
- **应用数量**: 14 款
- **规则总数**: 29 条

## 相关链接

- [GKD 官网](https://gkd.li/)
- [GKD GitHub](https://github.com/gkd-kit/gkd)
- [GKD 订阅模板](https://github.com/gkd-kit/subscription-template)

## 许可证

[MIT](LICENSE)
