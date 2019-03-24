# Genea

用 JavaScript 写一个遗传算法的 Demo。

效果演示：[https://www.coyeah.top/genea](https://www.coyeah.top/genea)

> 遗传算法（Genetic Algorithm）是模拟达尔文生物进化论的自然选择和遗传学机理的生物进化过程的计算模型，是一种通过模拟自然进化过程搜索最优解的方法。

简单来说就是从模仿染色体的结构不断地递归式组合,最后形成一个目标个体。该 Demo 中通过对字符串随机生成一个初始种群，然后组合形成新的种群，再进行组合......直至出现目标个体，或者超过预设的繁衍代数（总不可能让他不断地递归下去吧，因为有可能运气不好还真的不出现目标个体）。

## 图解

```flow
st=>start: 初始化种群
op1=>operation: 计算基因健康比
cond=>condition: 未出现目标个体
op2=>operation: 随机选择父母
op3=>operation: 基因对半组合
op4=>operation: 孩子基因变异
op5=>operation: 组合成新种群
e=>end: 结束算法
st->op1->cond->op2->op3->op4->op5->op1
cond(yes)->op2
cond(no)->e
```

## 算法代码中出现的关键词，

种群（populations）、基因健康比例（fitness）、繁衍（breed）、变异（mutate）、组合（crossOver）。
