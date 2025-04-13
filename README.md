# TypeScript | Base73
![NPM Version](https://img.shields.io/npm/v/base73) ![GitLab License](https://img.shields.io/gitlab/license/61406328) ![NPM Type Definitions](https://img.shields.io/npm/types/base73) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/base73)

> An ASCII encoding scheme with a base of 73 for binary data.

**Base73** is an encoding scheme for binary data using a base of 73 and an ASCII character set. Binary data is taken 7 bits at a time, and mapped to each character. Since `2^7` is equal to 128, the first 54 characters of the set contain secondary values, which are represented by prefixing the character with the secondary access character. The secondary access character is `^` (ASCII 94).

Natively in **TypeScript**, with **ESM** and **CommonJS** compatibility. To get started, install the library:
```bash
# Deno
deno add jsr:@jacobhaap/base73

# Node.js
npm install base73
```

*Character Set:*
```
!#$%&+-0123456789<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz
```

## Encoding
A **Uint8Array** can be encoded to a **base73 string** using the `encode` function.

The *encode* function has one input parameter:
```js
function encode(bytes) {};
```
Where:
 - ***bytes*** is binary data for encoding.

The ***bytes*** parameter is expected as a *Uint8Array*. The *encode* function is synchronous, and returns a *string*.

*Example use:*
```ts
import { encode } from "@jacobhaap/base73";

const bytes = Uint8Array.from([34, 84, 104, 101, 32, 71, 97, 109, 101, 34]);
const str = encode(bytes); // <B6-V#7^Eh^9QM
```

## Decoding
A **base73 string** can be decoded to a **Uint8Array** using the `decode` function.

The *decode* function has two input parameters:
```js
function decode(str, strict = true) {};
```
Where:
 - ***str*** is a base73-encoded string for decoding.
 - ***strict*** is an optional value to disable strict decoding.

The ***str*** parameter expects a base73- encoded *string*, and the optional ***strict*** parameter expects a *boolean* value (defaults to *true*). The decode function is synchronous, and returns a *Uint8Array*.

*Example use:*
```ts
import { decode } from "@jacobhaap/base73";

const str = "<B6-V#7^Eh^9QM";
const bytes = decode(str);

/*
Uint8Array(10) [
  34, 84, 104, 101, 32,
  71, 97, 109, 101, 34
]
*/
```
