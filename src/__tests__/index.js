/* eslint-disable import/no-unresolved */
import test from 'ava';
import { createHash, randomBytes } from 'crypto';
import sha1 from '../';

function nativeSha1(bytes) {
  const hash = createHash('sha1');
  const buffer = new Buffer(bytes);
  hash.update(new Buffer(buffer));
  return hash.digest('hex');
}

function stringToBuffer(str) {
  const buffer = new Buffer(str, 'utf-8');
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

test('Invalid data should throw type error', t => {
  const error = t.throws(() => {
    sha1('hello there');
  });

  t.true(error instanceof TypeError);
});

test('Sample text', t => {
  const buffer = stringToBuffer('The quick brown fox jumps over the lazy dog');
  t.is(sha1(buffer), nativeSha1(buffer));
});

function createRandomUint8Array(length) {
  return new Promise((resolve, reject) => {
    randomBytes(length, (error, buffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
      }
    });
  });
}

for (let i = 0; i < 50; i++) {
  const length = Math.pow(i, 2.5) | 0;
  test(`Random data of length: ${length}`, async (t) => {
    const buffer = await createRandomUint8Array(length);
    t.is(sha1(buffer), nativeSha1(buffer));
  });
}
