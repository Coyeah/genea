'use strict'

const Genea = require('./Genea');
const {getTargetStr, toChars} = require('./helper');

function run (str) {
  let target = getTargetStr(str);
  const ga = new Genea({
    geneLength: target.length,
    mutateProbability: 0.5,
    doneFitness: 1,
    populationSize: 100,
    generationsSize: 400,
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
      // this.history.push(toChars(populations[index]));
      this.history.push({
        similar: toChars(populations[index]),
        populations: populations.map(value => toChars(value)),
        fitnesses,
      });
    },
    done: function (matches) {
      console.log(matches);
      this.isDone = true;
    }
  });
  ga.history = [];
  ga.isDone = false;
  ga.initPopulation();
  ga.step = ga.populationBreedforStep;
  return ga;
}

module.exports = run;
