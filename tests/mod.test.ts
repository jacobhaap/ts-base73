/**
 * @fileoverview Test script for the base73 'encode' and 'decode' functions.
 * @author Jacob V. B. Haap <iacobus.xyz>
 * @license MIT
 */

import * as base73 from "../src/mod.ts";

/** Test Vectors */
const vectors = {
    "": "",
    "g": "er",
    "gr": "e^@r",
    "gre": "e^@^%^0",
    "gree": "e^@^%^6U",
    "greet": "e^@^%^6X^0",
    "greeti": "e^@^%^6X^1^2",
    "greetin": "e^@^%^6X^1^2^R",
    "greeting": "e^@^%^6X^1^2^Rer",
    "greetings": "e^@^%^6X^1^2^Re^@^D",
    "greetings fellow human": "e^@^%^6X^1^2^Re^@^H-eB^8^Pi^A^H-u^5^<^Ei!",
}

const encoder = new TextEncoder(); // Encoder to encode strings
const decoder = new TextDecoder("utf-8"); // Decoder to decode to utf-8

// Test for base73 'encode' function.
// Iterates over the vector key-value pairs, for each encoding the string as
// a Uint8Array, then calling the 'encode' function to encode the bytes as a
// base73 string 'encoded'.
// console.assert checks that 'encoded' matches the vector 'encoding'
Deno.test(`Function 'encode' encodes a Uint8Array to a base73 string`, () => {
    for (const [string, encoding] of Object.entries(vectors)) { // Iterate over vector key-value pairs
        const bytes = encoder.encode(string); // Encode 'string' to Uint8Array
        const encoded = base73.encode(bytes); // Encode 'bytes' to base73 string
        console.assert(encoded == encoding, `Mismatch for '${string}', expected ${encoding}, got ${encoded}`);
    }
});

// Test for base73 'decode' function.
// Iterates over the vector key-value pairs, for each decoding the base73 string
// to a Uint8Array with the 'decode' function, then decoding the Uint8Array to
// a utf-8 string 'str'.
// console.assert checks that 'str' matches the vector 'string'
Deno.test(`Function 'decode' decodes a base73 string to a Uint8Array`, () => {
    for (const [string, encoding] of Object.entries(vectors)) { // Iterate over vector key-value pairs
        const bytes = base73.decode(encoding); // Decode base73 'encoding' to Uint8Array 'bytes'
        const str = decoder.decode(bytes); // Decode 'bytes' to utf-8 string 'str'
        console.assert(str == string, `Mismatch for '${encoding}', expected ${string}, got ${str}`);
    }
});
