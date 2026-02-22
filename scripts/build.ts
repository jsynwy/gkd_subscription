import { updateDist } from '@gkd-kit/tools';
import subscription from './check';
import { unlink } from 'fs/promises';

await updateDist(subscription);

// 删除 dist/README.md，避免覆盖自定义文档
try {
  await unlink('./dist/README.md');
  console.log('已删除 dist/README.md');
} catch {
  // 文件不存在时忽略错误
}
