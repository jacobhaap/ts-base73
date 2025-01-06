const encode = require('./src/encode');
const decode = require('./src/decode');

function base73() {
    throw new Error(`Function 'base73' requires a method.`);
}

base73 = {
    fromString: function(string) {
        const bitString = Array.from(new TextEncoder().encode(string))
            .map(byte => byte.toString(2).padStart(8, "0"))
            .join("");
        return encode(bitString);
    },
    toString: function(base73String, strict = true) {
        const bitString = decode(base73String, strict);
        const byteArray = bitString.match(/.{1,8}/g).map(byte => parseInt(byte, 2));
        return new TextDecoder().decode(Uint8Array.from(byteArray));
    },
    fromBuffer: function(buffer) {
        const bitString = buffer.reduce((acc, byte) => 
            acc + byte.toString(2).padStart(8, "0"), "");
        return encode(bitString);
    },
    toBuffer: function(base73String, strict = true) {
        const bitString = decode(base73String, strict);
        return Buffer.from(bitString.match(/.{8}/g).map(byte => parseInt(byte, 2)));
    },
    fromUint8Array: function(uint8Array) {
        const bitString = Array.from(uint8Array)
            .map(byte => byte.toString(2).padStart(8, "0"))
            .join("");
        return encode(bitString);
    },
    toUint8Array: function(base73String, strict = true) {
        const bitString = decode(base73String, strict);
        const byteArray = bitString.match(/.{1,8}/g).map(byte => parseInt(byte, 2));
        return new Uint8Array(byteArray);
    },
    fromHex: function(hex) {
        const bitString = Array.from(hex.match(/.{1,2}/g))
            .map(byte => parseInt(byte, 16).toString(2).padStart(8, "0"))
            .join("");
        return encode(bitString);
    },
    toHex: function(base73String, strict = true) {
        const bitString = decode(base73String, strict);
        return bitString.match(/.{1,8}/g)
            .map(byte => parseInt(byte, 2).toString(16).padStart(2, "0"))
            .join("");
    }
}

module.exports = base73;
