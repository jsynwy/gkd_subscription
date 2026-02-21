import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.qiyi.video',
  name: '爱奇艺',
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
          matches: '@[clickable=true] >(1,2) [text="关闭"]',
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
            'org.qiyi.android.video.MainActivity',
            'org.qiyi.video.PhoneCloudRecordActivity',
          ],
          matches:
            '[vid="close" || vid="unused_res_a" || desc="关闭"][visibleToUser=true]',
        },
      ],
    },
  ],
});
