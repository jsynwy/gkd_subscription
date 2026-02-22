import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.youku.phone',
  name: '优酷视频',
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
          matches: '[text*="跳过"][text.length<10][visibleToUser=true]',
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
          matches: '[text="忽略此版本" || text="暂不升级"][visibleToUser=true]',
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
            '[vid="closeView" || vid="close" || text="关闭广告"][visibleToUser=true]',
        },
      ],
    },
  ],
});
