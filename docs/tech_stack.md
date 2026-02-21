# 技术栈

## 核心框架

- **GKD (搞快点)** - Android 自动跳过广告工具，本项目为其订阅规则模板
- **Node.js** - 运行时环境 (>=22)
- **TypeScript** - 主要开发语言
- **pnpm** - 包管理工具 (>=9)

## 主要依赖

### GKD 生态
- `@gkd-kit/api` - GKD API 定义 (v0.8.0)
- `@gkd-kit/define` - GKD 定义工具 (v0.0.1)
- `@gkd-kit/tools` - GKD 构建工具 (v0.8.0)

### 开发工具
- `typescript` - TypeScript 编译器 (v5.9.3)
- `tsx` - TypeScript 执行器 (v4.20.6)

### 代码质量
- `eslint` - JavaScript/TypeScript 代码检查 (v9.39.1)
- `typescript-eslint` - TypeScript ESLint 插件 (v8.46.4)
- `prettier` - 代码格式化工具 (v3.6.2)
- `eslint-config-prettier` - Prettier ESLint 配置
- `eslint-plugin-unused-imports` - 未使用导入检测 (v4.3.0)

### Git Hooks
- `simple-git-hooks` - 简单的 Git hooks 工具 (v2.13.1)
- `lint-staged` - 暂存区文件检查 (v16.2.6)

### 工具库
- `json5` - JSON5 解析器 (v2.2.3)

## 配置文件

- `tsconfig.json` - TypeScript 配置
- `eslint.config.mjs` - ESLint 配置
- `.prettierrc.mjs` - Prettier 配置
- `pnpm-workspace.yaml` - pnpm 工作区配置
- `.gitignore` - Git 忽略配置
- `.npmrc` - npm 配置

## 项目类型

本项目是 ESM (ES Module) 类型项目，`package.json` 中设置了 `"type": "module"`。
