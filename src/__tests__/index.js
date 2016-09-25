import test from 'ava';
import sha1 from '..';
import { nativeSha1, randomBytes } from './_helpers';

test('Invalid data should throw type error', t => {
  t.throws(() => sha1('hello there'), TypeError);
});

test('Sample text', t => {
  const buffer = Buffer.from('The quick brown fox jumps over the lazy dog');
  t.is(sha1(buffer), nativeSha1(buffer));
});

for (let i = 0; i < 50; i++) {
  const length = Math.pow(i, 2.5) | 0;
  test(`Random data of length: ${length}`, async t => {
    const buffer = await randomBytes(length);
    t.is(sha1(buffer), nativeSha1(buffer));
  });
}
