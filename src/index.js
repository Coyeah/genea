'use strict'

/* 分步骤模式，去除备注后 node 运行 index.js */
// const log = require('./log');
// let gene = log('Coyeah');
// const step = () => {
//   setTimeout(() => {
//     gene.step();
//     if (gene.isDone) return;
//     console.log(gene.history.length, gene.history[gene.history.length - 1].similar);
//     return step();
//   }, 300);
// }


const run = require('./run');
let isRunning = false;
let history = [];
let target = document.getElementById('genea-text');
let times = document.getElementById('times');
play ();

target.addEventListener('click', function () {
  if (isRunning) return;
  target.innerHTML = 'Loading... Please wait a moment.';
  setTimeout(play, 0);
});

function play () {
  history = run('You are more powerful than any other person.').history;
  times.innerHTML = history.length;
  isRunning = true;
  const step = () => {
    setTimeout(() => {
      if (history.length === 0) return isRunning = false;;
      target.innerHTML = history.shift();
      return step();
    }, 30);
  }
  step();
}
