import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.douban.frodo',
  name: '豆瓣',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      desc: '跳过开屏广告',
      matchRoot: true,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 2,
      actionCd: 500,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          matches:
            '[vid="skip" || vid="count_down" || text*="跳过" || text^="Skip" || text^="SKIP"][visibleToUser=true]',
          snapshotUrls: [],
        },
      ],
    },
  ],
});
