export const systemLittleEndian =
  new Uint16Array(new Uint8Array([0x7F, 0xFF]).buffer)[0] === 0xFF7F;

export function swap32(num) {
  return ((num >> 24) & 0xff)
    | ((num >> 8) & 0xff00)
    | ((num << 8) & 0xff0000)
    | ((num << 24) & 0xff000000);
}

export function align(address, alignment) {
  const tmp = alignment - 1;
  return (address + tmp) & ~tmp;
}

export function getUint8Array(data) {
  if (data instanceof Uint8Array) {
    return data;
  }

  if (data instanceof ArrayBuffer || Array.isArray(data)) {
    return new Uint8Array(data);
  }

  if (ArrayBuffer.isView(data)) {
    const { buffer, byteOffset, byteLength } = data;
    return new Uint8Array(buffer, byteOffset, byteLength);
  }

  throw new TypeError('Input data must be convertible to Uint8Array');
}

/** Convert a uint32 to an 8-character big-endian hex string. */
export function hexify(n) {
  let s = '';
  let i = 8;
  while (i--) {
    s += ((n >>> (i << 2)) & 0xf).toString(16);
  }
  return s;
}

export function choice(x, y, z) {
  return (x & y) ^ (~x & z);
}

export function parity(x, y, z) {
  return x ^ y ^ z;
}

export function majority(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}

export function rotateLeft(value, bits) {
  return (value << bits) | (value >>> (32 - bits));
}
