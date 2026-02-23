import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'tv.danmaku.bilibilihd',
  name: '哔哩哔哩HD',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      desc: '跳过哔哩哔哩HD版开屏广告',
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
            '[vid="count_down" || vid="skip"]',
            '[text*="跳过" || text*="skip" || text^="Skip" || text^="SKIP"][text.length<10][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
