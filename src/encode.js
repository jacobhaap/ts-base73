const { bitToCharMap, padToLength } = require('./base73');

function encode(bitString) {
    let encodedString = "";
    let paddingCount = 0;

    for (let i = 0; i < bitString.length; i += 7) {
        let bitChunk = bitString.slice(i, i + 7);
        const bitValue = parseInt(padToLength(bitChunk, 7), 2);
        encodedString += bitToCharMap.get(bitValue);
    }

    while (encodedString.length % 8 !== 0) {
        encodedString += "=";
        paddingCount++;
    }

    return encodedString;
}

module.exports = encode;
