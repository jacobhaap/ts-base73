const charSet = "!#$%&+-0123456789<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
const charToBitMap = new Map();
const bitToCharMap = new Map();

for (let i = 0; i < 73; i++) {
    const char = charSet[i];
    charToBitMap.set(char, i);
    bitToCharMap.set(i, char);
}

const secondaryChar = "^";
const secondaryBitOffset = 73;

for (let i = 0; i < 55; i++) {
    const secondaryCombo = secondaryChar + charSet[i];
    charToBitMap.set(secondaryCombo, secondaryBitOffset + i);
    bitToCharMap.set(secondaryBitOffset + i, secondaryCombo);
}

const padToLength = (str, length, padChar = "0") => str.padEnd(length, padChar);

module.exports = {
    charToBitMap,
    bitToCharMap,
    secondaryChar,
    padToLength
}
