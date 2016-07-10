export const systemLittleEndian =
  new Uint16Array(new Uint8Array([0x7F, 0xFF]).buffer)[0] === 0xFF7F;

export function swap4(num) {
  return ((num >> 24) & 0xff)
    | ((num >> 8) & 0xff00)
    | ((num << 8) & 0xff0000)
    | ((num << 24) & 0xff000000);
}

export function align(address, alignment) {
  const tmp = alignment - 1;
  return (address + tmp) & ~tmp;
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
