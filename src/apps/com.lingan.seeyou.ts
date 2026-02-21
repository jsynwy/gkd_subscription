import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.lingan.seeyou',
  name: '美柚',
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
    {
      key: 2,
      name: '弹窗广告',
      desc: '关闭各种弹窗广告',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      rules: [
        {
          matches:
            '[text="关闭" || desc="关闭" || vid="close" || vid="iv_close"][visibleToUser=true]',
        },
      ],
    },
  ],
});
