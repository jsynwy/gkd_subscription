# GKD 订阅文档

## 项目概述

本项目是 GKD (搞快点) 的第三方订阅规则仓库，用于自动跳过 Android 应用的开屏广告和弹窗广告。

## 订阅信息

- **订阅地址**: `https://raw.githubusercontent.com/jsynwy/gkd_subscription/main/dist/gkd.json5`
- **应用数量**: 14 款
- **规则总数**: 29 条

## 支持应用列表

| 应用名 | 包名 | 规则说明 |
|--------|------|----------|
| 爱奇艺 | com.qiyi.video | 开屏广告、弹窗广告 |
| 哔哩哔哩 | tv.danmaku.bili | 开屏广告、弹窗广告 |
| 滴滴出行 | com.sdu.didi.psnger | 开屏广告、弹窗广告 |
| 豆瓣 | com.douban.frodo | 开屏广告、弹窗广告 |
| 高德地图 | com.autonavi.minimap | 开屏广告、弹窗广告 |
| 酷安 | com.coolapk.market | 开屏广告、弹窗广告 |
| 美柚 | com.lingan.seeyou | 开屏广告、弹窗广告 |
| 随手记 | com.mymoney | 开屏广告、弹窗广告 |
| 腾讯视频 | com.tencent.qqlive | 开屏广告、弹窗广告 |
| 微博 | com.sina.weibo | 开屏广告、弹窗广告 |
| 小红书 | com.xingin.xhs | 开屏广告、弹窗广告 |
| 萤石云视频 | com.videogo | 开屏广告、主页广告、弹窗广告 |
| 优酷视频 | com.youku.phone | 开屏广告、弹屏广告 |
| 知乎 | com.zhihu.android | 开屏广告、弹窗广告 |

## 规则结构

每个应用规则包含以下属性：

- **id**: 应用包名
- **name**: 应用名称
- **groups**: 规则组数组
  - **key**: 规则组唯一标识
  - **name**: 规则组名称
  - **desc**: 规则描述
  - **fastQuery**: 是否启用快速查询
  - **matchTime**: 匹配时间窗口
  - **actionMaximum**: 最大执行次数
  - **resetMatch**: 重置匹配时机
  - **rules**: 匹配规则数组

## 开发指南

### 环境要求

- Node.js >= 22
- pnpm >= 9

### 常用命令

```bash
# 安装依赖
pnpm install

# 构建订阅文件
pnpm run build

# 代码检查
pnpm run check

# 格式化代码
pnpm run format
```

### 添加新应用规则

1. 在 `src/apps/` 目录下创建 `{packageName}.ts` 文件
2. 使用 `defineGkdApp` 定义应用规则
3. 运行 `pnpm run build` 构建订阅
4. 提交更改并推送

## 订阅更新

订阅文件构建后位于 `dist/gkd.json5`，可通过以下地址访问：

```
https://raw.githubusercontent.com/jsynwy/gkd_subscription/main/dist/gkd.json5
```

## 相关链接

- [GKD 官网](https://gkd.li/)
- [GKD GitHub](https://github.com/gkd-kit/gkd)
- [GKD 订阅模板](https://github.com/gkd-kit/subscription-template)
