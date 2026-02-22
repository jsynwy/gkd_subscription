import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.douban.frodo',
  name: '豆瓣',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      matchRoot: true,
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 2,
      resetMatch: 'app',
      priorityTime: 10000,
      rules: [
        {
          actionCd: 1000,
          matches: [
            // 匹配可点击的广告容器（跳过按钮的父容器）
            '[vid="ad_parent"][clickable=true]',
            // 兜底：匹配广告容器
            '[vid="ad_parent"]',
          ],
        },
      ],
    },
  ],
});
