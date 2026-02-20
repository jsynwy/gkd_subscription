import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.videogo',
  name: '萤石云视频',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      desc: '点击跳过开屏广告',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          matches:
            '[text*="跳过" || text*="skip" || text*="Skip"][text.length<10][visibleToUser=true]',
        },
      ],
    },
    {
      key: 2,
      name: '主页广告',
      desc: '关闭主页广告卡片',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      activityIds: 'com.videogo.main.MainTabActivity',
      rules: [
        {
          matches: '[id="com.videogo:id/ad_close"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 3,
      name: '弹窗广告',
      desc: '关闭各种弹窗广告',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      activityIds: ['.main.MainTabActivity', '.login.LoadingActivity'],
      rules: [
        {
          action: 'back',
          matches:
            '[text="了解并试用服务" || text="新机礼包专享"][visibleToUser=true]',
        },
      ],
    },
  ],
});
