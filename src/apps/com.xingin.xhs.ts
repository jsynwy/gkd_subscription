import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.xingin.xhs',
  name: '小红书',
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
          excludeActivityIds: [
            'com.xingin.alioth.search.GlobalSearchActivity',
            'com.xingin.growth.ob.FloatingObPageActivity',
            'com.xingin.matrix.notedetail.NoteDetailActivity',
          ],
          excludeMatches:
            '[text="首页" || text="选择兴趣推荐更精准"][visibleToUser=true]',
          matches:
            '[text*="跳过" || text^="Skip"][text.length<10][!(vid="tv_user_name")][visibleToUser=true]',
        },
      ],
    },
  ],
});
