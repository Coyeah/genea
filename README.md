# Genea

用 JavaScript 写一个遗传算法的 Demo。

效果演示：[https://www.coyeah.top/genea](https://www.coyeah.top/genea)

> 遗传算法（Genetic Algorithm）是模拟达尔文生物进化论的自然选择和遗传学机理的生物进化过程的计算模型，是一种通过模拟自然进化过程搜索最优解的方法。

简单来说就是从模仿染色体的结构不断地递归式组合,最后形成一个目标个体。该 Demo 中通过对字符串随机生成一个初始种群，然后组合形成新的种群，再进行组合......直至出现目标个体，或者超过预设的繁衍代数（总不可能让他不断地递归下去吧，因为有可能运气不好还真的不出现目标个体）。

## 图解

[流程图解](https://github.com/Coyeah/genea/blob/master/flow.jpg)

## 算法代码中出现的关键词，

种群（populations）、基因健康比例（fitness）、繁衍（breed）、变异（mutate）、组合（crossOver）。
