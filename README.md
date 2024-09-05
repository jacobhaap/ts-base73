# Base73
> A lightweight JavaScript implementation of the base73 encoding method.

Base73 uses a set of 73 ASCII characters, where binary data is taken 7 bits at a time, and mapped to each character. Since `2^7` is equal to 128, the first 54 characters of the set contain secondary values, that can be accessed by prefixing with the secondary access character. The secondary access character is `^` (ASCII 94). If the encoded data is not divisible by 8, padding is added, determined by how many characters are missing to reach the next multiple of 8. The padding character is `=` (ASCII 61).

## Getting Started
To get started, install the library:
```
npm install base73
```
The library can handle Unit8Array, Buffer, Hexadecimal, String, Decimal, and Binary data types. All encoding and decoding can be completed using the `base73` function.
 - base73.Unit8Array.from()
 - base73.toUnit8Array()
 - base73.buffer.from()
 - base73.toBuffer()
 - base73.hex.from()
 - base73.toHex()
 - base73.string.from()
 - base73.toString()
 - base73.decimal.from()
 - base73.toDecimal()
 - base73.binary.from()
 - base73.toBinary()

## Usage
First, require the module:
```
const base73 = require('base73');
```

The following example shows how you can convert between a string and a base73 encoded string:
```
const base73 = require('base73');

const string = "Nothing Matters.";
console.log("Encoded String:", base73.string.from(string));

// Example Output
// Encoded String: TH^RxuR^@^K9@YDP^1^#^Vk^$r======

```

This next example shows conversion from base73 encoded strings, to Unit8Arrays and Hexadecimal:
```
const base73 = require('base73');

const encodedString = "TH^RxuR^@^K9@YDP^1^#^Vk^$r======";

console.log("Unit8Array:", base73.toUnit8Array(encodedString));
console.log("Hexadecimal:", base73.toHex(encodedString));

// Example output
// Unit8Array: Uint8Array(16) [78, 111, 116, 104, 105, 110, 103, 32, 77, 97, 116, 116, 101, 114, 115, 46]
// Hexadecimal: 4e6f7468696e67204d6174746572732e

```

## Character Set
The base73 character set is based on 73 ASCII characters. Alongside this is also the use of the secondary access character `^`, and the padding character `=`, making for a total extended set size of 75.
```
const base73CharSet = [
    33, 35, 36, 37, 38, 43, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 60, 62,
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90, 95, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122,
  ];

// Characters
// !#$%&+-0123456789<>
// @ABCDEFGHIJKLMNOPQR
// STUVWXYZ_abcdefghi
// jklmnopqrstuvwx
// yz
  
```
