# 实施计划

> 本文档为 AI 开发者分步实施指南，按 Phase 和 Step 顺序严格执行。
> 每一步完成后必须进行验证测试，验证失败不得进入下一步。

---

## Phase 1: 环境验证与项目检查

### Step 1: 验证 Node.js 和 pnpm 环境

**目标**：确保项目依赖已正确安装，构建命令可用。

**执行指令**：
1. 在项目根目录执行依赖安装命令
2. 执行代码检查命令
3. 执行构建命令

**验证测试**（必须全部通过）：
- [ ] 依赖安装命令执行完毕，无网络错误或权限错误
- [ ] `pnpm run check` 命令返回退出码 0，终端无 ERROR 字样
- [ ] `pnpm run build` 命令成功执行
- [ ] 检查 `dist/gkd.json5` 文件存在且文件大小大于 0 字节
- [ ] 检查 `dist/gkd.json5` 内容包含 "id"、"name"、"apps" 字段

**失败处理**：
- 如 check 失败，查看终端错误信息，检查 src/subscription.ts 是否被意外修改
- 如 build 失败，检查 scripts/build.ts 是否存在

---

### Step 2: 分析现有规则文件模板

**目标**：理解规则文件的标准结构，为后续创建做准备。

**执行指令**：
1. 读取 `src/apps/com.tencent.mm.ts` 文件内容
2. 读取 `src/apps/li.songe.gkd.ts` 文件内容
3. 读取 `src/apps/com.tencent.mobileqq.ts` 文件内容
4. 对比三个文件的共同点和差异

**验证测试**：
- [ ] 能准确说出每个文件必须包含的 4 个顶层字段（id, name, groups, 以及导入语句）
- [ ] 理解 `groups` 是一个数组，当前为空
- [ ] 理解 `id` 字段对应 Android 应用的包名
- [ ] 理解 `name` 字段是应用的中文显示名称

---

## Phase 2: 创建小红书规则文件（作为模板验证）

### Step 3: 创建小红书规则文件框架

**目标**：创建第一个应用的规则文件，只包含基本信息，无具体规则。

**执行指令**：
1. 在 `src/apps/` 目录下创建新文件 `com.xingin.xhs.ts`
2. 文件内容包含：
   - 导入语句 `import { defineGkdApp } from '@gkd-kit/define';`
   - 导出默认对象，使用 `defineGkdApp()` 包裹
   - 对象包含字段：`id: 'com.xingin.xhs'`, `name: '小红书'`, `groups: []`

**验证测试**：
- [ ] 文件 `src/apps/com.xingin.xhs.ts` 存在
- [ ] 运行 `pnpm run check` 无错误，退出码为 0
- [ ] 运行 `pnpm run build` 成功
- [ ] 检查 `dist/gkd.json5`，确认内容中包含 `id:"com.xingin.xhs"` 或 `id:'com.xingin.xhs'`

---

### Step 4: 为小红书添加开屏广告规则

**目标**：在小红书规则文件中添加第一个具体的跳过规则，学习 groups 数组的结构。

**执行指令**：
1. 打开 `src/apps/com.xingin.xhs.ts` 文件
2. 将 `groups: []` 改为包含一个对象的数组
3. 该对象包含以下字段：
   - `key: 1` (规则在应用内的唯一标识，从 1 开始递增)
   - `name: '开屏广告'` (规则的显示名称)
   - `priority: 10` (优先级，数字越大越优先执行)
   - `rules: []` (具体匹配规则数组，暂时为空)

**验证测试**：
- [ ] 文件修改后运行 `pnpm run check`，无 TypeScript 类型错误
- [ ] `pnpm run check` 退出码为 0
- [ ] `pnpm run build` 成功执行
- [ ] 检查构建后的 `dist/gkd.json5`，确认包含小红书的开屏广告规则
- [ ] 确认规则中 priority 字段值为 10

---

### Step 5: 为小红书添加弹窗广告规则

**目标**：在小红书规则文件中添加第二个规则，学习同一应用内多规则的配置。

**执行指令**：
1. 打开 `src/apps/com.xingin.xhs.ts` 文件
2. 在 `groups` 数组中再添加一个对象（注意数组元素之间用逗号分隔）：
   - `key: 2` (key 必须在应用内唯一，不能与开屏广告的 1 重复)
   - `name: '弹窗广告'`
   - `priority: 6` (优先级低于开屏广告的 10)
   - `rules: []`

**验证测试**：
- [ ] 两个规则的 `key` 值不相同（一个是 1，另一个是 2）
- [ ] 运行 `pnpm run check`，无重复 key 错误
- [ ] `pnpm run check` 和 `pnpm run build` 都成功
- [ ] 两个规则的 priority 值分别是 10 和 6
- [ ] 构建后的 `dist/gkd.json5` 中小红书应用包含两个规则组

---

## Phase 3: 批量创建剩余应用规则

### Step 6: 创建哔哩哔哩规则文件

**目标**：使用小红书的结构作为模板，创建哔哩哔哩的完整规则。

**执行指令**：
1. 复制 `src/apps/com.xingin.xhs.ts` 的全部内容
2. 创建新文件 `src/apps/tv.danmaku.bili.ts`
3. 修改以下字段：
   - `id: 'tv.danmaku.bili'`
   - `name: '哔哩哔哩'`
   - 保持两个规则（开屏广告 key:1、弹窗广告 key:2）和相同的优先级

**验证测试**：
- [ ] 文件 `src/apps/tv.danmaku.bili.ts` 存在
- [ ] `pnpm run check` 通过（无重复 id 错误）
- [ ] `pnpm run build` 成功
- [ ] 构建后 `dist/gkd.json5` 包含哔哩哔哩的两个规则

---

### Step 7: 创建高德地图规则文件

**执行指令**：
1. 创建 `src/apps/com.autonavi.minimap.ts`
2. 填入信息：
   - `id: 'com.autonavi.minimap'`
   - `name: '高德地图'`
   - 两个规则：开屏广告（key:1, priority: 10）、弹窗广告（key:2, priority: 6）

**验证测试**：
- [ ] 文件存在且 `pnpm run check` 无错误
- [ ] 构建后包含高德地图规则

---

### Step 8: 创建酷安规则文件

**执行指令**：
1. 创建 `src/apps/com.coolapk.market.ts`
2. 填入信息：
   - `id: 'com.coolapk.market'`
   - `name: '酷安'`
   - 两个规则：开屏广告（key:1, priority: 10）、弹窗广告（key:2, priority: 6）

**验证测试**：
- [ ] 文件存在且 `pnpm run check` 无错误
- [ ] 构建后包含酷安规则

---

### Step 9: 创建萤石云视频规则文件

**执行指令**：
1. 创建 `src/apps/com.videogo.ts`
2. 填入信息：
   - `id: 'com.videogo'`
   - `name: '萤石云视频'`
   - 两个规则：开屏广告（key:1, priority: 10）、弹窗广告（key:2, priority: 6）

**验证测试**：
- [ ] 文件存在且 `pnpm run check` 无错误
- [ ] 构建后包含萤石云视频规则

---

## Phase 4: 最终验证与总结

### Step 10: 完整项目验证

**目标**：确保所有 5 个应用、10 条规则全部正确配置。

**执行指令**：
1. 运行完整检查：`pnpm run check`
2. 运行完整构建：`pnpm run build`
3. 检查生成的 `dist/gkd.json5` 文件内容

**最终验证清单**：
- [ ] `pnpm run check` 无任何错误
- [ ] `pnpm run build` 成功生成 `dist/gkd.json5`
- [ ] 文件中包含 5 个应用：小红书、哔哩哔哩、高德地图、酷安、萤石云视频
- [ ] 每个应用包含 2 个规则组：开屏广告（priority: 10）、弹窗广告（priority: 6）
- [ ] 所有规则组的 `key` 在每个应用内唯一（分别为 1 和 2）

---

## 实施计划完成标准

当 Step 10 的所有验证清单项都通过时，实施计划完成。此时应更新 `docs/progress.md` 记录已完成的工作。
