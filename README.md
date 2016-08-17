# tiny-sha1

[![NPM](https://img.shields.io/npm/v/tiny-sha1.svg)](https://www.npmjs.com/package/tiny-sha1)
[![Build Status](https://img.shields.io/travis/maxdavidson/tiny-sha1/master.svg)](https://travis-ci.org/maxdavidson/tiny-sha1)
[![Coverage Status](https://img.shields.io/coveralls/maxdavidson/tiny-sha1/master.svg)](https://coveralls.io/github/maxdavidson/tiny-sha1?branch=master)
[![Dependency Status](https://img.shields.io/david/maxdavidson/tiny-sha1.svg)](https://david-dm.org/maxdavidson/tiny-sha1)
[![devDependency Status](https://img.shields.io/david/dev/maxdavidson/tiny-sha1.svg)](https://david-dm.org/maxdavidson/tiny-sha1?type=dev)

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
