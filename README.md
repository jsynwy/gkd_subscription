# GKD 订阅规则

适用于 [GKD (搞快点)](https://gkd.li/) 的第三方订阅规则，自动跳过 Android 应用的开屏广告。

---

## 用户指南

### 订阅地址

```
https://raw.githubusercontent.com/jsynwy/gkd_subscription/main/dist/gkd.json5
```

**国内镜像加速**：
```
https://fastly.jsdelivr.net/gh/jsynwy/gkd_subscription@main/dist/gkd.json5
```

### 使用方法

1. 下载安装 [GKD 应用](https://github.com/gkd-kit/gkd/releases)
2. 打开 GKD → 点击"订阅" → 点击右下角"+"
3. 粘贴上方订阅地址 → 点击"添加"
4. 返回首页 → 开启"无障碍服务"权限
5. 开启"后台运行"权限（建议）

### 支持应用（21 款）

| 序号 | 应用 | 功能 |
|------|------|------|
| 1 | 12306 | 开屏广告 |
| 2 | 爱奇艺 | 开屏广告、青少年模式、更新提示、会员推广弹窗 |
| 3 | 爱奇艺Pad版 | 开屏广告 |
| 4 | 哔哩哔哩 | 开屏广告、青少年模式、更新提示、视频广告 |
| 5 | 哔哩哔哩HD | 开屏广告、青少年模式、更新提示、视频广告 |
| 6 | 滴滴出行 | 开屏广告 |
| 7 | 豆瓣 | 开屏广告 |
| 8 | 高德地图 | 开屏广告 |
| 9 | 酷安 | 开屏广告 |
| 10 | 美柚 | 开屏广告 |
| 11 | 澎湃新闻 | 开屏广告 |
| 12 | 随手记 | 开屏广告 |
| 13 | 腾讯视频 | 开屏广告、更新提示、青少年模式、视频广告 |
| 14 | 微博 | 开屏广告 |
| 15 | 微博国际版 | 开屏广告 |
| 16 | 小红书 | 开屏广告 |
| 17 | 优酷视频 | 开屏广告、青少年模式、更新提示、视频广告 |
| 18 | 萤石云视频 | 开屏广告 |
| 19 | 中国移动浙江 | 开屏广告 |
| 20 | 知乎 | 开屏广告 |
| 21 | YouTube | 开屏广告、视频广告-跳过、关闭广告面板、会员广告-不用了 |
| 21 | YouTube | 开屏广告、视频广告-跳过、关闭广告面板、会员广告-不用了 |

---

## 开发者指南

### 项目结构

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
│   └── @progress.md              # 进度记录
├── scripts/                      # 构建脚本
├── package.json                  # 项目依赖配置
└── tsconfig.json                 # TypeScript 配置
```

### 环境要求

- **Node.js**: >= 22 (必需，用于 WasmGc 校验正则表达式)
- **pnpm**: >= 9 (推荐包管理器)
- **Git**: 用于版本控制

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/jsynwy/gkd_subscription.git
cd gkd_subscription

# 安装依赖
pnpm install

# 开发模式：修改规则后构建
pnpm run build
```

### 添加新应用规则

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
  ],
});
```

### 字段说明

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

### 选择器语法

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

### 构建与发布

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

### Git 提交规范

提交信息格式：`类型: 描述`

常用类型：
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式（不影响代码运行的变动）
- `refactor`: 重构
- `chore`: 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat: 添加微博应用规则"
git commit -m "fix: 修复哔哩哔哩开屏广告匹配规则"
git commit -m "docs: 更新README使用说明"
```

---

## 相关链接

- [GKD 官网](https://gkd.li/)
- [GKD GitHub](https://github.com/gkd-kit/gkd)
- [GKD 订阅模板](https://github.com/gkd-kit/subscription-template)

## 许可证

[MIT](LICENSE)
