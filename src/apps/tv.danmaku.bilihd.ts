import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'tv.danmaku.bilihd',
  name: '哔哩哔哩HD',
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
            '[vid="count_down" || vid="skip" || text*="跳过" || text^="Skip"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 2,
      name: '青少年模式',
      fastQuery: true,
      rules: [
        {
          matches: '[text="我知道了"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 3,
      name: '更新提示',
      fastQuery: true,
      rules: [
        {
          matches: '[text="暂不升级" || text="忽略此版本"][visibleToUser=true]',
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
            '[vid="close" || vid="iv_close" || desc="关闭" || text="关闭"][visibleToUser=true]',
        },
      ],
    },
  ],
});
