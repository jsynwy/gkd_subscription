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
          actionCd: 500,
          matches: [
            '[vid="ad_parent"] > [vid="skip"]',
            '[vid="splash_skip"] >2 [vid="splash_skip_text"]',
            '[vid="ad_parent"]',
            '[text*="跳过" || text*="skip" || text^="Skip" || text^="SKIP"][text.length<10][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
