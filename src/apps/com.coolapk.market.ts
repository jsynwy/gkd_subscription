import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.coolapk.market',
  name: '酷安',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      priorityTime: 10000,
      excludeActivityIds: [
        '.view.search.',
        '.view.feed.',
        '.view.node.DynamicNodePageActivity',
      ],
      rules: [
        {
          matches:
            '[!(id="com.coolapk.market:id/item_view") && !(vid="card_view")] > [text*="跳过"][text.length<10][width<500 && height<300][visibleToUser=true]',
        },
      ],
    },
  ],
});
