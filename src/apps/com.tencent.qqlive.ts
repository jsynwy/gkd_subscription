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
      name: '更新提示',
      fastQuery: true,
      rules: [
        {
          matches: '[text="暂不升级"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 3,
      name: '青少年模式',
      fastQuery: true,
      rules: [
        {
          matches: '[text="我知道了"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 4,
      name: '视频广告',
      fastQuery: true,
      rules: [
        {
          matches:
            '[text="关闭广告" || text*="跳过" || vid="close"][visibleToUser=true]',
        },
      ],
    },
  ],
});
