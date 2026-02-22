import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.mymoney',
  name: '随手记',
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
            '[text*="跳过" || text*="skip"][text.length<10][visibleToUser=true]',
        },
      ],
    },
  ],
});
