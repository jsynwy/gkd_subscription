# 项目进度记录

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

### 下一步计划
- [ ] 持续测试各应用开屏广告规则的兼容性
- [ ] 根据用户反馈优化特定应用的规则
- [ ] 考虑增加更多主流应用的支持
