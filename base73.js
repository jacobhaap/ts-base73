const base73CharSet = require('./charSet');

const charToBitMap = {};
const bitToCharMap = [];
const base73Chars = base73CharSet.map(code => String.fromCharCode(code));

for (let i = 0; i < 73; i++) {
    charToBitMap[base73Chars[i]] = i;
    bitToCharMap[i] = base73Chars[i];
}

const secondaryChar = '^';
const secondaryBitOffset = 73;

for (let i = 0; i < 55; i++) {
    const secondaryCombo = secondaryChar + base73Chars[i];
    charToBitMap[secondaryCombo] = secondaryBitOffset + i;
    bitToCharMap[secondaryBitOffset + i] = secondaryCombo;
}

const padToLength = (str, length, padChar = '0') => str.padEnd(length, padChar);

const base73 = {
    encode(byteArray) {
        const bitString = byteArray.reduce(
            (acc, byte) => acc + byte.toString(2).padStart(8, '0'),
            ''
        );

        let encodedString = '';
        for (let i = 0; i < bitString.length; i += 7) {
            let bitChunk = bitString.slice(i, i + 7);
            const bitValue = parseInt(padToLength(bitChunk, 7), 2);
            encodedString += bitToCharMap[bitValue];
        }

        const paddingLength = (8 - (encodedString.length % 8)) % 8;
        if (paddingLength > 0) {
            encodedString += '='.repeat(paddingLength);
        }

        return encodedString;
    },

    decode(base73String) {
        base73String = base73String.replace(/=+$/, '');

        let bitString = '';
        for (let i = 0; i < base73String.length; i++) {
            let currentChar = base73String[i];
            let bitValue;

            if (currentChar === secondaryChar) {
                currentChar += base73String[++i];
            }

            bitValue = charToBitMap[currentChar];
            if (bitValue === undefined) {
                throw new Error(`Invalid character encountered during decoding: ${currentChar}`);
            }

            bitString += bitValue.toString(2).padStart(7, '0');
        }

        const byteArray = [];
        for (let i = 0; i < bitString.length; i += 8) {
            let byteChunk = bitString.slice(i, i + 8);
            byteArray.push(parseInt(padToLength(byteChunk, 8), 2));
        }

        let trimmedByteArray = byteArray;
        while (trimmedByteArray.length > 0 && trimmedByteArray[trimmedByteArray.length - 1] === 0) {
            trimmedByteArray.pop();
        }

        return new Uint8Array(trimmedByteArray);
    },

    fromHex(hexString) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return this.encode(bytes);
    },

    toHex(base256String) {
        const byteArray = this.decode(base256String);
        return Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
    },

    fromDecimal(decimal) {
        const byteArray = [];
        while (decimal > 0) {
            byteArray.push(decimal & 0xFF);
            decimal = Math.floor(decimal / 256);
        }
        return this.encode(new Uint8Array(byteArray.reverse()));
    },

    toDecimal(base256String) {
        const byteArray = this.decode(base256String);
        return byteArray.reduce((acc, byte, index) => acc + byte * Math.pow(256, byteArray.length - index - 1), 0);
    },

    fromBinary(binaryString) {
        const bytes = new Uint8Array(binaryString.length / 8);
        for (let i = 0; i < binaryString.length; i += 8) {
            bytes[i / 8] = parseInt(binaryString.substr(i, 8), 2);
        }
        return this.encode(bytes);
    },

    toBinary(base256String) {
        const byteArray = this.decode(base256String);
        return Array.from(byteArray).map(byte => byte.toString(2).padStart(8, '0')).join('');
    },

    fromString(str) {
        const utf8Encoder = new TextEncoder();
        const byteArray = utf8Encoder.encode(str);
        return this.encode(byteArray);
    },

    toString(base256String) {
        const byteArray = this.decode(base256String);
        const utf8Decoder = new TextDecoder();
        return utf8Decoder.decode(byteArray);
    }
};

module.exports = base73;
