import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'tv.danmaku.bili',
  name: '哔哩哔哩',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      matchRoot: true,
      fastQuery: true,
      actionMaximum: 2,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          actionCd: 500,
          matches:
            '[vid="count_down" || vid="skip" || text*="跳过"][visibleToUser=true]',
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
            'tv.danmaku.bili.MainActivityV2',
            'tv.danmaku.bili.ui.splash.ad.page.HotSplashActivity',
          ],
          matches:
            '[vid="close" || vid="iv_close" || desc="关闭" || text="关闭"][visibleToUser=true]',
        },
      ],
    },
  ],
});
