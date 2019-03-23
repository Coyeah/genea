'use strict'

class Genea {
  constructor (config) {
    this.currentGeneration = 0;
    this.populations = [];
    this.fitnesses = [];

    this.mutateProbability = config.mutateProbability || 0.5; // 0 ~ 1
    this.generationsSize = config.generationsSize || 100;
    this.populationSize = config.populationSize || 100;
    this.doneFitness = config.doneFitness || 1; // 0 ~ 1

    this.geneLength = config.geneLength;
    this.getFitness = config.getFitness;

    this.onGeneration = config.onGeneration || this.onGeneration;
    this.outOfGenerationsSize = config.outOfGenerationsSize || this.outOfGenerationsSize;
    this.done = config.done || this.done;

    if (!this.geneLength || !this.getFitness) this.start = () => {}
  }

  start () {
    this.initPopulation();
    this.populationBreed();
  }

  initPopulation () {
    this.currentGeneration = 1;
    this.populations = [];
    for (let i = 0, len = this.populationSize; i < len; i++) {
      let gene = getRandomGene(this.geneLength);
      this.populations.push(gene);
    }
    this.makeFitnesses();
    this.onGeneration(this.currentGeneration, this.populations, this.fitnesses);
  }

  makeFitnesses () {
    this.fitnesses = [];
    this.totalFitness = 0;
    this.populations.forEach((individual, i) => {
      let fitness = this.getFitness(individual, this.populations);
      this.fitnesses[i] = fitness;
      this.totalFitness += fitness;
    });
  }

  judge () {
    if (this.currentGeneration >= this.generationsSize) {
      this.outOfGenerationsSize(this.populations, this.fitnesses);
      return true;
    }
    let matches = this.getMatches();
    if (matches.length > 0) {
      this.done(matches);
      return true;
    }
    return false;
  }

  getMatches () {
    let bests = [];
    this.populations.forEach((individual, i) => {
      let fitness = this.fitnesses[i];
      if (fitness >= this.doneFitness) {
        bests.push({
          gene: individual,
          fitness: fitness,
          pos: i,
        });
      }
    });
    return bests;
  }

  populationBreed () {
    if (this.judge()) return;
    this.currentGeneration++;
    let oldPopulations = this.populations;
    let newPopulations = [];
    for (let i = 0, len = oldPopulations.length; i < len; i++) {
      let father = this.rotate();
      let mother = this.rotate();
      let child = this.crossOver(father, mother);
      child = this.mutate(child);
      newPopulations.push(child);
    }
    this.populations = newPopulations;
    this.makeFitnesses();
    this.onGeneration(this.currentGeneration, this.populations, this.fitnesses);
    return this.populationBreed();
  }

  rotate () {
    let pos = Math.random();
    let soFar = 0;
    for (let i = 0, len = this.fitnesses.length; i < len; i++) {
      let fitness = this.fitnesses[i];
      soFar += fitness;
      if (soFar / this.totalFitness >= pos) {
        return this.populations[i];
      }
    }
  }

  crossOver (father, mother) {
    let pos = Math.floor(this.geneLength * Math.random());
    let child1 = father.substring(0, pos) + mother.substring(pos);
    let child2 = mother.substring(0, pos) + mother.substring(pos);
    return this.getFitness(child1) > this.getFitness(child2)
      ? child1
      : child2;
  }

  mutate (child) {
    let mutateProbability = Math.random();
    if (mutateProbability < this.mutateProbability) return child;
    let pos = Math.floor(Math.random() * this.geneLength);
    let arr = child.split('');
    arr[pos] = +child[pos] ^ 1;
    return arr.join('');
  }

  onGeneration () {}

  outOfGenerationsSize () {}

  done () {}
}

function getRandomGene(len) {
  let gene = '';
  for (let i = 0; i < len; i++) {
    gene += ((Math.floor(Math.random() * 100)) % 2 === 0)
      ? '1'
      : '0';
  }
  return gene;
}

module.exports = Genea;
