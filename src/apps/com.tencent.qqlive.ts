import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.tencent.qqlive',
  name: '腾讯视频',
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
          action: 'clickCenter',
          matches: 'TextView[text*="跳过"][text.length<=10]',
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
          activityIds: [
            '.ona.activity.SplashHomeActivity',
            '.ona.activity.VideoDetailActivity',
          ],
          matches:
            '[vid="close" || desc="关闭" || text="关闭"][visibleToUser=true]',
        },
      ],
    },
  ],
});
