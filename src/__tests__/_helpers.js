import { createHash, randomBytes as randomBytesCallback } from 'crypto';
import promisify from 'promisify-node';

export const randomBytes = promisify(randomBytesCallback);

export function nativeSha1(bytes) {
  const hash = createHash('sha1');
  hash.update(Buffer.from(bytes));
  return hash.digest('hex');
}
