'use strict'

const Genea = require('./Genea');
const singleCharSize = 6;
const alphabetArr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,!? '.split('')
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

function play (str) {
  let target = getTargetStr(str);
  const ga = new Genea({
    geneLength: target.length,
    mutateProbability: 0.5,
    doneFitness: 1,
    populationSize: 30,
    generationsSize: 500,
    getFitness: function (gene) {
      let count = 0;
      for (let i = 0, len = gene.length; i < len; i++) {
        if (gene[i] === target[i]) count++
      }
      const likeness = count / target.length;
      return likeness;
    },
    onGeneration: function (currentGeneration, populations, fitnesses) {
      let max = 0, index = 0;
      fitnesses.forEach((fitness, i) => {
        if (fitness > max) {
          max = fitness;
          index = i;
        }
      });
      this.history.push(toChars(populations[index]))
    }
  });
  ga.history = [];
  ga.start();
  return ga;
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

module.exports = play;
