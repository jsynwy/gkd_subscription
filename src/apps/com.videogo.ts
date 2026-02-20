import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.videogo',
  name: '萤石云视频',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      rules: [
        {
          matches: '[text="跳过"]',
        },
      ],
    },
    {
      key: 2,
      name: '弹窗广告',
      rules: [
        {
          matches: '[text="关闭" || desc="关闭"]',
        },
      ],
    },
  ],
});
