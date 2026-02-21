# 项目概况

## 项目简介

本项目是 **GKD (搞快点)** 的订阅模板仓库。GKD 是一款 Android 平台上的自动化工具，主要用于自动跳过应用启动广告、弹窗等。

该模板仓库帮助开发者快速构建自己的 GKD 订阅规则，通过简单的配置即可生成可在 GKD 应用中使用的订阅文件。

## 项目信息

| 属性 | 值 |
|------|-----|
| 项目名称 | @gkd-kit/subscription-template |
| 版本 | 0.0.0 |
| 项目类型 | Node.js / TypeScript 模块 |
| 模块类型 | ESM (ES Module) |
| 许可证 | 未指定 |

## 核心功能

1. **订阅规则定义**：提供类型安全的 TypeScript 接口定义 GKD 订阅规则
2. **应用规则管理**：支持为每个 Android 应用定义独立的跳过规则
3. **全局规则支持**：可定义适用于所有应用的全局规则
4. **分类管理**：支持对规则进行分类组织
5. **自动构建**：通过 GitHub Actions 自动构建和发布订阅文件

## 技术架构

- **运行时**：Node.js >= 22
- **开发语言**：TypeScript 5.9
- **包管理器**：pnpm >= 9
- **构建工具**：@gkd-kit/tools + tsx
- **代码质量**：ESLint + Prettier
- **版本控制**：Git + simple-git-hooks

## GKD 生态

本项目基于 GKD 官方提供的工具链构建：

- `@gkd-kit/api` - GKD API 类型定义
- `@gkd-kit/define` - GKD 规则定义辅助函数
- `@gkd-kit/tools` - GKD 构建和检查工具

## 文件结构

项目主要包含以下部分：

- `src/` - 源代码目录，包含订阅规则定义
  - `subscription.ts` - 订阅主入口
  - `categories.ts` - 分类定义
  - `globalGroups.ts` - 全局规则组
  - `apps/` - 应用规则目录
- `scripts/` - 构建和检查脚本
- `dist/` - 构建输出目录
- `.github/workflows/` - GitHub Actions 工作流

## 开发流程

1. 克隆模板仓库并初始化环境
2. 在 `src/apps/` 目录下添加应用规则
3. 运行 `pnpm run check` 验证规则
4. 运行 `pnpm run build` 本地构建
5. 提交代码并推送到 GitHub
6. 通过 GitHub Actions 自动构建和发布

## 使用方式

构建后的订阅文件位于 `dist/gkd.json5`，可通过以下地址访问：

```
https://raw.githubusercontent.com/{username}/{repo}/main/dist/gkd.json5
```

将该地址添加到 GKD 应用即可使用此订阅。

## 相关链接

- GKD 官网：https://gkd.li/
- GKD API 文档：https://gkd.li/api
- 模板仓库：https://github.com/gkd-kit/subscription-template
