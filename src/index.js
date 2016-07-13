import {
  systemLittleEndian, swap4, align, hexify,
  choice, majority, parity, rotateLeft,
} from './utils';

const w = new Uint32Array(80);

export default function sha1(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError('Input data must be a Uint8Array.');
  }

  // Allocate a buffer to fit the message data,
  // the padding byte and the 64-bit message bit length
  const buffer = new ArrayBuffer(align(bytes.byteLength + 9, 64));
  const data = new Uint32Array(buffer);

  // Copy the message data and set the padding byte
  const dataU8 = new Uint8Array(buffer);
  dataU8.set(bytes);
  dataU8[bytes.byteLength] = 0x80;

  // Swap bytes if neeeded
  if (systemLittleEndian) {
    for (let i = 0, len = data.length; i < len; ++i) {
      data[i] = swap4(data[i]);
    }
  }

  const bitLength = 8 * bytes.byteLength;

  // Store the message bit length as a 64-bit value
  data[data.length - 2] = bitLength / Math.pow(2, 32);
  data[data.length - 1] = bitLength;

  // Set the initial hash state
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  /* eslint-disable one-var, one-var-declaration-per-line */
  let i, a, b, c, d, e, tmp;

  for (let offset = 0, len = data.length; offset < len; offset += 16) {
    for (i = 0; i < 16; ++i) {
      w[i] = data[offset + i];
    }

    for (i = 16; i < 80; ++i) {
      w[i] = rotateLeft(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }

    a = h0;
    b = h1;
    c = h2;
    d = h3;
    e = h4;

    for (i = 0; i < 20; ++i) {
      tmp = (rotateLeft(a, 5) + choice(b, c, d) + e + 0x5a827999 + w[i]) & 0xffffffff;
      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = tmp;
    }

    for (i = 20; i < 40; ++i) {
      tmp = (rotateLeft(a, 5) + parity(b, c, d) + e + 0x6ed9eba1 + w[i]) & 0xffffffff;
      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = tmp;
    }

    for (i = 40; i < 60; ++i) {
      tmp = (rotateLeft(a, 5) + majority(b, c, d) + e + 0x8f1bbcdc + w[i]) & 0xffffffff;
      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = tmp;
    }

    for (i = 60; i < 80; ++i) {
      tmp = (rotateLeft(a, 5) + parity(b, c, d) + e + 0xca62c1d6 + w[i]) & 0xffffffff;
      e = d;
      d = c;
      c = rotateLeft(b, 30);
      b = a;
      a = tmp;
    }

    h0 = (h0 + a) & 0xffffffff;
    h1 = (h1 + b) & 0xffffffff;
    h2 = (h2 + c) & 0xffffffff;
    h3 = (h3 + d) & 0xffffffff;
    h4 = (h4 + e) & 0xffffffff;
  }

  return `${hexify(h0)}${hexify(h1)}${hexify(h2)}${hexify(h3)}${hexify(h4)}`;
}
