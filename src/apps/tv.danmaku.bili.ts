import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'tv.danmaku.bili',
  name: '哔哩哔哩',
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
