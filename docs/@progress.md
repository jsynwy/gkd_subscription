# 项目进度记录

## 2026-02-23

### 本次更新：参考AIsouler/GKD_subscription项目重写爱奇艺Pad版和豆瓣APP规则

#### 参考项目
- 项目地址：https://github.com/AIsouler/GKD_subscription
- 分析了该项目中爱奇艺Pad版和豆瓣APP的规则实现

#### 爱奇艺Pad版规则改进
1. **添加 `matchRoot: true`** - 确保能匹配根节点上的广告元素
2. **增加 `actionMaximum: 2`** - 支持倒计时+跳过两次点击场景
3. **添加 `actionCd: 500`** - 点击间隔500ms，避免重复点击失败
4. **优化选择器** - 支持vid精确匹配和文本模糊匹配
   - `[vid="skip" || vid="count_down"]`
   - `[text*="跳过" || text^="Skip" || text^="SKIP"]`

#### 豆瓣APP规则改进
1. **采用数组形式的匹配规则** - 支持多种匹配方式同时生效
2. **保留vid精确匹配** - 适配豆瓣新老版本布局
   - `[vid="ad_parent"] > [vid="skip"]` - 新布局
   - `[vid="splash_skip"] >2 [vid="splash_skip_text"]` - 旧布局
   - `[vid="ad_parent"]` - 兜底方案
3. **保留文本模糊匹配** - 作为备用匹配方案
4. **保持 `matchRoot: true`** - 确保能匹配根节点

#### 技术要点
- 两种规则设计都兼顾了应用新老版本的兼容性
- 同时支持vid精确匹配和文本模糊匹配
- 支持中英文跳过按钮识别
- 参考项目的规则更加精细，考虑了更多边界情况
- 构建验证通过

---

## 2026-02-23

### 本次更新：修复爱奇艺Pad版开屏广告误触发问题

#### 问题分析
用户反馈爱奇艺Pad版开屏广告有时跳过时会误触发广告。

经过检查发现：
1. 原规则选择器包含了 `"关闭"` 和 `"close"` 匹配条件
2. 这会导致在正常界面中，任何包含"关闭"文字的按钮都可能被误触发
3. 选择器过于宽泛，缺乏精确性

#### 修复方案
简化选择器，只匹配"跳过"相关文本，与项目标准模板一致：
```typescript
// 修复前
'[text*="跳过" || text*="关闭" || text*="skip" || text*="close"][text.length<10][visibleToUser=true]'

// 修复后
'[text*="跳过" || text*="skip" || text^="Skip"][text.length<10][visibleToUser=true]'
```

#### 技术要点
- 移除 `"关闭"` 和 `"close"` 匹配条件，避免误触
- 保持 `[text.length<10]` 限制，确保只匹配短文本按钮
- 保留 `[visibleToUser=true]` 确保只匹配可见元素

---

## 2026-02-23

### 本次更新：修复哔哩哔哩HD版规则不生效问题

#### 问题分析
用户反馈哔哩哔哩HD版（包名：tv.danmaku.bilibilihd）规则不生效。

经过检查发现：
1. 虽然存在 `src/apps/tv.danmaku.bilibilihd.ts` 文件
2. 但应用ID错误地写成了 `tv.danmaku.hd`，与实际包名不符
3. 导致GKD无法正确识别和匹配该应用

#### 修复方案
修正应用ID为正确的包名：
```typescript
// 修复前
id: 'tv.danmaku.hd',

// 修复后
id: 'tv.danmaku.bilibilihd',
```

#### 规则配置
- **matchRoot**: true - 匹配根节点（哔哩哔哩系列需要）
- **fastQuery**: true - 快速查询
- **actionMaximum**: 2 - 最大执行2次（支持倒计时+跳过场景）
- **actionCd**: 500 - 点击间隔500ms
- **匹配规则**: 支持vid精确匹配和文本模糊匹配，同时支持中英文跳过按钮

---

## 2026-02-22

### 本次更新内容

#### 1. 精简规则 - 所有应用只保留开屏广告
- **原因**：弹窗广告规则容易误触，且各应用弹窗样式变化频繁，维护成本高
- **涉及应用**：原有14款应用全部移除弹窗广告规则组
- **修改方式**：将 `groups` 数组中 `key: 2` 及以后的规则组全部删除，只保留 `key: 1` 开屏广告规则

#### 2. 新增7款应用支持
| 应用 | 包名 | 特殊配置 |
|------|------|----------|
| YouTube | `com.google.android.youtube` | 支持中英文跳过按钮 |
| 微博国际版 | `com.weico.international` | 标准开屏广告规则 |
| 爱奇艺Pad版 | `com.qiyi.video.pad` | 标准开屏广告规则 |
| 哔哩哔哩HD | `tv.danmaku.bilihd` | matchRoot: true |
| 中国移动浙江 | `com.example.businesshall` | 标准开屏广告规则 |
| 12306 | `com.MobileTicket` | 标准开屏广告规则 |
| 澎湃新闻 | `com.wondertek.paper` | 标准开屏广告规则 |

#### 3. 修复豆瓣开屏广告规则
**问题**：原有规则在某些设备上不生效

**原因分析**：
1. 缺少 `matchRoot: true` 属性，某些设备无法正确匹配根节点
2. 选择器过于简单，只匹配 `text*="跳过"`，未考虑英文、繁体等其他文字
3. 缺少 `actionCd` 点击间隔，可能导致重复点击失败

**修复内容**：
```typescript
{
  key: 1,
  name: '开屏广告',
  matchRoot: true,        // 新增：匹配根节点
  fastQuery: true,
  matchTime: 10000,
  actionMaximum: 2,       // 增加：最大执行次数改为2
  resetMatch: 'app',
  priorityTime: 10000,
  rules: [
    {
      actionCd: 500,      // 新增：点击间隔500ms
      matches:
        '[vid="skip" || vid="count_down" || text*="跳过" || text^="Skip" || text^="SKIP"][visibleToUser=true]',  // 扩展：支持多种跳过文字
    },
  ],
}
```

### 数据统计
- **当前支持应用总数**：24款
- **原有应用**：14款
- **新增应用**：7款
- **规则类型**：所有应用仅支持开屏广告

### 技术要点

#### 开屏广告规则最佳实践
1. **添加 `matchRoot: true`**：确保能匹配到根节点上的广告元素（YouTube、哔哩哔哩、豆瓣等需要）
2. **设置 `actionCd` 点击间隔**：避免重复点击导致失败
3. **扩展匹配条件**：同时支持中英文跳过按钮
4. **`actionMaximum: 2`**：开屏广告有时需要点击两次（倒计时+跳过）

#### 标准开屏广告规则模板
```typescript
{
  key: 1,
  name: '开屏广告',
  fastQuery: true,
  matchTime: 10000,
  actionMaximum: 1,
  resetMatch: 'app',
  priorityTime: 10000,
  rules: [
    {
      matches:
        '[text*="跳过" || text*="skip" || text^="Skip"][text.length<10][visibleToUser=true]',
    },
  ],
}
```

---

## 2026-02-22

### 本次更新：修复豆瓣APP开屏广告跳过问题

#### 问题分析
通过分析快照文件，发现原有规则无法匹配豆瓣新版本的开屏广告布局：

1. **原有问题**：规则匹配 `[vid="splash_skip"] >2 [vid="splash_skip_text"]`，但实际布局中没有这些 vid
2. **实际布局**：跳过按钮在 `skip` (id=134) 节点，但它 `clickable: false`，真正的可点击区域是父容器 `ad_parent` (id=133)

#### 修复方案
更新规则支持多种匹配方式：
```typescript
rules: [
  {
    actionCd: 1000,
    matches: [
      // 匹配广告容器内的跳过按钮（新布局）
      '[vid="ad_parent"] > [vid="skip"]',
      // 匹配旧布局
      '[vid="splash_skip"] >2 [vid="splash_skip_text"]',
      // 兜底：匹配广告容器本身（如果跳过按钮不可点击）
      '[vid="ad_parent"]',
    ],
  },
],
```

## 2026-02-23

### 本次更新：参考AIsouler/GKD_subscription项目重写爱奇艺Pad版和豆瓣APP规则

#### 参考项目
- 项目地址：https://github.com/AIsouler/GKD_subscription
- 分析了该项目中爱奇艺Pad版和豆瓣APP的规则实现

#### 爱奇艺Pad版规则改进
1. **添加 `matchRoot: true`** - 确保能匹配根节点上的广告元素
2. **增加 `actionMaximum: 2`** - 支持倒计时+跳过两次点击场景
3. **添加 `actionCd: 500`** - 点击间隔500ms，避免重复点击失败
4. **优化选择器** - 支持vid精确匹配和文本模糊匹配
   - `[vid="skip" || vid="count_down"]`
   - `[text*="跳过" || text^="Skip" || text^="SKIP"]`

#### 豆瓣APP规则改进
1. **采用数组形式的匹配规则** - 支持多种匹配方式同时生效
2. **保留vid精确匹配** - 适配豆瓣新老版本布局
   - `[vid="ad_parent"] > [vid="skip"]` - 新布局
   - `[vid="splash_skip"] >2 [vid="splash_skip_text"]` - 旧布局
   - `[vid="ad_parent"]` - 兜底方案
3. **保留文本模糊匹配** - 作为备用匹配方案
4. **保持 `matchRoot: true`** - 确保能匹配根节点

#### 技术要点
- 两种规则设计都兼顾了应用新老版本的兼容性
- 同时支持vid精确匹配和文本模糊匹配
- 支持中英文跳过按钮识别
- 参考项目的规则更加精细，考虑了更多边界情况
- 构建验证通过

### 下一步计划
- [ ] 持续测试各应用开屏广告规则的兼容性
- [ ] 根据用户反馈优化特定应用的规则
- [ ] 考虑增加更多主流应用的支持
- [ ] 学习参考项目其他应用的规则实现方式
