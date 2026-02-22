import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.qiyi.video.pad',
  name: '爱奇艺Pad版',
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
            '[text*="跳过" || text*="关闭" || text*="skip" || text*="close"][text.length<10][visibleToUser=true]',
        },
      ],
    },
  ],
});
