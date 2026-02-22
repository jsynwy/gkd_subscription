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
          matches: '[vid="ad_parent"] >2 [vid="ad_view_skip_text"]',
        },
      ],
    },
  ],
});
