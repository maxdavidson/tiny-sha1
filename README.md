# tiny-sha1

A tiny, synchronous implementation of the [SHA-1 hash function](https://en.wikipedia.org/wiki/SHA-1).

Only works on `Uint8Array` for performance and portability reasons.


## API

```typescript
export default function sha1(bytes: Uint8Array): string;
```


## Usage

```javascript
import sha1 from 'tiny-sha1';

const emptyBuffer = new Uint8Array(0);
const hash = sha1(emptyBuffer);

console.assert(hash === 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
```
