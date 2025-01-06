const { charToBitMap, secondaryChar } = require('./base73');

function decode(base73String, strict = true) {
    base73String = base73String.replace(/=+$/, "");

    let bitString = "";

    for (let i = 0; i < base73String.length; i++) {
        let currentChar = base73String[i];
        let bitValue;

        if (currentChar === secondaryChar) {
            currentChar += base73String[++i] || "";
        }

        bitValue = charToBitMap.get(currentChar);
        if (bitValue === undefined) {
            if (strict) {
                throw new Error(`Invalid character encountered during decoding: ${currentChar}`);
            } else {
                bitString += "0000000";
                continue;
            }
        }

        bitString += bitValue.toString(2).padStart(7, "0");
    }

    const validBitLength = Math.floor(bitString.length / 8) * 8;
    return bitString.slice(0, validBitLength);
}

module.exports = decode;
