# 项目架构与文件说明

## 目录结构

```
gkd_subscription/
├── .github/           # GitHub 工作流配置
├── dist/              # 构建输出目录
├── docs/              # 项目文档
├── scripts/           # 构建脚本
├── src/               # 源代码
│   ├── apps/          # 应用规则定义
│   ├── categories.ts  # 分类定义
│   ├── globalGroups.ts # 全局规则组
│   └── subscription.ts # 订阅主入口
├── .gitignore         # Git 忽略配置
├── .npmrc             # npm 配置
├── .prettierignore    # Prettier 忽略配置
├── .prettierrc.mjs    # Prettier 配置
├── eslint.config.mjs  # ESLint 配置
├── package.json       # 项目配置
├── pnpm-lock.yaml     # pnpm 锁定文件
├── pnpm-workspace.yaml # pnpm 工作区配置
├── README.md          # 项目说明
└── tsconfig.json      # TypeScript 配置
```

## 核心文件说明

### src/subscription.ts
**订阅主入口文件**
- 定义订阅的基本信息（id、name、version、author）
- 整合分类、全局规则组和应用规则
- 导出完整的订阅配置对象

```typescript
import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 233,
  name: 'Subscription',
  version: 0,
  author: 'author',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/gkd-kit/subscription-template',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
```

### src/categories.ts
**分类定义文件**
- 定义规则分类列表
- 用于组织和分类不同类型的规则
- 当前为空数组，可根据需要添加分类

### src/globalGroups.ts
**全局规则组定义文件**
- 定义适用于所有应用的全局规则
- 例如：通用的跳过广告规则
- 当前为空数组，可根据需要添加全局规则

### src/apps/
**应用规则目录**
- 每个应用对应一个 TypeScript 文件
- 文件名格式：`{packageName}.ts`
- 包含应用 ID、名称和规则组定义

示例文件：
- `com.tencent.mm.ts` - 微信
- `com.tencent.mobileqq.ts` - QQ
- `li.songe.gkd.ts` - GKD 应用本身

新增应用规则文件（2026-02-20）：
- `com.xingin.xhs.ts` - 小红书
- `tv.danmaku.bili.ts` - 哔哩哔哩
- `com.autonavi.minimap.ts` - 高德地图
- `com.coolapk.market.ts` - 酷安
- `com.videogo.ts` - 萤石云视频

每个应用规则文件包含：
- **开屏广告规则** (key: 1)：匹配开屏页跳过按钮
- **弹窗广告规则** (key: 2)：匹配应用内弹窗广告关闭按钮

### scripts/build.ts
**构建脚本**
- 调用 `@gkd-kit/tools` 的 `updateDist` 函数
- 将源代码构建为最终的订阅文件
- 输出到 `dist/` 目录

### scripts/check.ts
**检查脚本**
- 检查 API 版本兼容性
- 验证订阅配置的有效性
- 在构建前执行验证

### dist/
**构建输出目录**
- `gkd.json5` - 构建后的订阅文件
- `gkd.version.json5` - 版本信息文件
- `CHANGELOG.md` - 变更日志
- `README.md` - 说明文档

### .github/workflows/
**GitHub Actions 工作流**
- `build_release.yml` - 构建并发布订阅
- `fix_lockfile.yml` - 修复锁定文件
- `delete_run.yml` - 删除运行记录

## 构建流程

1. **开发阶段**：在 `src/` 目录下编辑规则文件
2. **检查阶段**：运行 `pnpm run check` 验证配置
3. **构建阶段**：运行 `pnpm run build` 生成订阅文件
4. **发布阶段**：通过 GitHub Actions 自动发布到 `dist/` 目录

## 开发规范

- 使用 TypeScript 编写规则
- 遵循 ESLint 和 Prettier 的代码规范
- 提交前会自动运行代码检查和格式化
- 使用 ESM 模块规范（`"type": "module"`）
