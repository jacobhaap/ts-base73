# Base73 
![NPM Version](https://img.shields.io/npm/v/base73) ![NPM License](https://img.shields.io/npm/l/base73) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/base73)

> An encoding method using a base of 73.

**Base73** is an encoding method using a base of 73 and an ASCII character set. Binary data is taken 7 bits at a time, and mapped to each character. Since `2^7` is equal to 128, the first 54 characters of the set contain secondary values, that can be accessed by prefixing with the secondary access character. The secondary access character is `^` (ASCII 94). If the encoded data is not divisible by 8, padding is added, determined by how many characters are missing to reach the next multiple of 8. The padding character is `=` (ASCII 61).

To get started, install the library:
```bash
npm install base73
```
Character Set:
```
!#$%&+-0123456789<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz
```

## Encoding & Decoding
This library supports Base73 Encoding & Decoding from **Strings**, **Buffers**, **Uint8Arrays**, and **Hexadecimal**. These are all supported as methods of `base73`. When decoding, if an invalid character is detected in the Base73 string, an error will be thrown unless strict decoding is disabled.
```js
// String Encoding & Decoding String
base73.fromString(string);
base73.toString(base73String, strict =  true);

// Buffer Encoding & Decoding
base73.fromBuffer(buffer);
base73.toBuffer(base73String, strict =  true);

// Uint8Array Encoding & Decoding
base73.fromUint8Array(uint8Array);
base73.toUint8Array(base73String, strict =  true);

//Hexadecimal Encoding & Decoding
base73.fromHex(hex);
base73.toHex(base73String, strict =  true);

```

## Example Use
In this first example, the `.fromString()` method of `base73` is used to encode a String to Base73.
```js
const base73 = require('base73');

const string = "Nothing Matters.";
console.log(base73.fromString(string));

// Sample Output:
// TH^RxuR^@^K9@YDP^1^#^Vk^$r======

```

In this second example, the `.toHex()` method of `base73` is used to decode Base73 to Hexadecimal.
```js
const base73 = require('base73');

const base73String = "Q^A&^_F#I^ImF_O$o^P^Ik!=";
console.log(base73.toHex(base73String));

// Sample Output:
// Q^A&^_F#I^ImF_O$o^P^Ik!=

```
