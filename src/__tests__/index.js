import test from 'ava';
import sha1 from '..';
import { getUint8Array } from '../utils';
import { nativeSha1, randomBytes } from './_helpers';

test('Invalid data should throw type error', t => {
  t.throws(() => sha1('hello there'), TypeError);
});

test('Sample text', t => {
  const buffer = Buffer.from('The quick brown fox jumps over the lazy dog');
  t.is(sha1(buffer), nativeSha1(buffer));
});

test('getUint8Array', t => {
  t.true(getUint8Array(new Uint8Array(1024)) instanceof Uint8Array);
  t.true(getUint8Array(new ArrayBuffer(1024)) instanceof Uint8Array);
  t.true(getUint8Array(Buffer.alloc(1024)) instanceof Uint8Array);
  t.true(getUint8Array(new Uint32Array(256)) instanceof Uint8Array);
  t.true(getUint8Array(new Float64Array(128)) instanceof Uint8Array);

  t.throws(() => getUint8Array());
  t.throws(() => getUint8Array('hello'));
  t.throws(() => getUint8Array(42));
});

for (let i = 0; i < 50; i++) {
  const length = Math.pow(i, 2.5) | 0;
  test(`Random data of length: ${length}`, async t => {
    const buffer = await randomBytes(length);
    t.is(sha1(buffer), nativeSha1(buffer));
  });
}
