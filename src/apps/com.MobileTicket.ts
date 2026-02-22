import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.MobileTicket',
  name: '12306',
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
            '[vid="tv_main_splash_skip" || vid="tv_skip"][visibleToUser=true]',
        },
      ],
    },
  ],
});
