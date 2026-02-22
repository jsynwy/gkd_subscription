import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.wondertek.paper',
  name: '澎湃新闻',
  groups: [
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
    },
  ],
});
