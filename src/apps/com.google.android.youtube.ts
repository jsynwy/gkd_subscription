import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.google.android.youtube',
  name: 'YouTube',
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
          actionCd: 500,
          matches:
            '[text*="跳过" || text^="Skip" || text*="跳过广告"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 2,
      name: '视频广告-跳过',
      fastQuery: true,
      rules: [
        {
          actionCd: 500,
          matches:
            '[vid="skip_ad_button" || id="com.google.android.youtube:id/modern_skip_ad_text"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 3,
      name: '关闭广告面板',
      fastQuery: true,
      rules: [
        {
          actionCd: 500,
          matches:
            '@[desc="关闭广告面板" || desc="Close ad panel"] <<n [vid="panel_header"][visibleToUser=true]',
        },
      ],
    },
    {
      key: 4,
      name: '会员广告-不用了',
      fastQuery: true,
      rules: [
        {
          matches:
            '[text="不用了，谢谢" || text="关闭" || text="Close" || text="No thanks"][visibleToUser=true]',
        },
      ],
    },
  ],
});
