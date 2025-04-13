/**
 * @fileoverview Entry point for base73.
 * Exports functions for encoding/decoding base73 strings from Uint8Arrays.
 * @module
 * @author Jacob V. B. Haap <iacobus.xyz>
 * @license MIT
 */

import { secondary, decimalCharMap, charDecimalMap } from "./charset.ts";

/** Re-export of base73 character set. */
export { charset } from "./charset.ts"

/**
 * Encode a Uint8Array as a base73 string.
 * @example
 * const bytes = Uint8Array.from([34, 84, 104, 101, 32, 71, 97, 109, 101, 34]);
 * const str = encode(bytes); // <B6-V#7^Eh^9QM
 */
export function encode(bytes: Uint8Array): string {
    let str = ""; // Initialize the encoded string
    let buffer = 0; // Temporary bit accumulator
    let c = 0; // Bit count in the accumulator

    // Iterate through each byte in 'bytes'
    for (let i = 0; i < bytes.length; i++) {
        buffer = (buffer << 8) | bytes[i]; // Shift 'buffer' left by 8 bits and add the current byte
        c += 8; // Increase the bit count by 8

        // While at least 7 bits are available in 'buffer', extract and encode
        while (c >= 7) {
            const val = (buffer >> (c - 7)) & 0x7F; // Extract the top 7 bits
            const char = decimalCharMap.get(val); // Map the 7 bit value to a base73 character
            if (char === undefined) {
                throw new Error(`Invalid value: ${val}`); // Throw an error of the value has no character
            }
            str += char; // Append the character to 'str'
            c -= 7; // Remove 7 bits from 'buffer'
        }
    }

    // Handle any remaining bits in 'buffer'
    if (c > 0) {
        const val = (buffer << (7 - c)) & 0x7F; // Pad remaining bits to form a 7 bit sequence
        const char = decimalCharMap.get(val); // Map the final value to a character
        if (char === undefined) {
            throw new Error(`Invalid final value: ${val}`); // Throw an error if invalid
        }
        str += char; // Append the final character to 'str'
    }

    return str; // Return the encoded string
}

/**
 * Decode a base73 string to a Uint8Array.
 * @example
 * const str = "<B6-V#7^Eh^9QM";
 * const bytes = decode(str); // Uint8Array(10) [34, 84, 104, 101, 32, 71, 97, 109, 101, 34]
 */
export function decode(str: string, strict: boolean = true): Uint8Array {
    let buffer = 0; // Temporary bit accumulator
    let c = 0; // Bit count in the accumulator
    const output: number[] = []; // Output byte array

    // Iterate through each character in 'str'
    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        // Handle secondary character prefix
        if (char === secondary) {
            i++;
            char = secondary + (str[i] || ""); // Combine secondary char with next char
        }

        const val = charDecimalMap.get(char); // Map character to its 7 bit value
        if (val === undefined) {
            if (!strict) {
                buffer = (buffer << 7); // Shift 'buffer' by 7 bits and treat as zero
                c += 7; // Increment bit count 'c'
            } else {
                throw new Error(`Invalid character during decoding: ${char}`); // Throw an error on invalid char in strict mode
            }
        } else {
            buffer = (buffer << 7) | val; // Append 7 bit value to 'buffer'
            c += 7; // Increment bit count 'c'
        }

        // Extract full bytes from 'buffer'
        while (c >= 8) {
            const byte = (buffer >> (c - 8)) & 0xFF; // Extract top 8 bits
            output.push(byte); // Push byte to 'output'
            c -= 8; // Reduce bit count 'c'
        }
    }

    return new Uint8Array(output); // Return decoded byte array
}
