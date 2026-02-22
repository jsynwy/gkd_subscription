import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.douban.frodo',
  name: '豆瓣',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      matchRoot: true,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 2,
      resetMatch: 'app',
      priorityTime: 10000,
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
    },
  ],
});
