import { createHash, randomBytes } from 'crypto';

export function nativeSha1(bytes) {
  const hash = createHash('sha1');
  hash.update(Buffer.from(bytes));
  return hash.digest('hex');
}

export function stringToBuffer(str) {
  const { buffer, byteOffset, byteLength } = Buffer.from(str, 'utf-8');
  return new Uint8Array(buffer, byteOffset, byteLength);
}

export function createRandomUint8Array(length) {
  return new Promise((resolve, reject) => {
    randomBytes(length, (error, nodeBuffer) => {
      if (error) {
        reject(error);
      } else {
        const { buffer, byteOffset, byteLength } = nodeBuffer;
        resolve(new Uint8Array(buffer, byteOffset, byteLength));
      }
    });
  });
}
