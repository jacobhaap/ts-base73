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

        return new Uint8Array(byteArray);
    }
};

module.exports = base73;
