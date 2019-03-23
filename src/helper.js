const singleCharSize = 6;
const alphabetArr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ., '.split('')
const alphabet = (() => {
  const alphabet = {}
  alphabetArr.forEach((ch, i) => {
    alphabet[ch] = i
  })
  return alphabet
})()

function getTargetStr (targetStr) {
  let binaryStr = '';
  for (let i = 0, len = targetStr.length; i < len; i++) {
    const ch = targetStr[i];
    const chIndex = alphabet[ch];
    binaryStr += paddingWidhZero(Number(chIndex).toString(2));
  }
  return binaryStr;
}

function paddingWidhZero (binary) {
  while (binary.length < singleCharSize) {
    binary = `0${binary}`;
  }
  return binary;
}

function toChars (gene) {
  let str = '';
  while (gene.length) {
    let ch = gene.substr(0, 6);
    gene = gene.substr(6);
    let chIndex = parseInt(ch, 2);
    if (chIndex >= alphabetArr.length) {
      chIndex = Math.floor(Math.random() * (alphabetArr.length - 1));
    }
    if (!alphabetArr[chIndex]) console.log(chIndex, parseInt(ch, 2));
    str += alphabetArr[chIndex];
  }
  return str;
}

module.exports = {
  getTargetStr,
  toChars,
}
