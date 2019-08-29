# typescript 版本 virtual dom 实现

## element.ts 构造虚拟DOM节点

## diff_core.ts 得到最短路径(DOM开销) 

比较变化前和变化后的变化，并得到最短路径[参考Levenshtein算法](https://en.wikipedia.org/wiki/Levenshtein_distance)

## patch.ts 进行对变化进行更改

## 期间回顾一下树的基本操作
    顺带附上二叉树的构造(createTree),深度优先遍历(BFS)，广度优先遍历(DFS)
    代码地址 [test/test.diff.ts](./test/test.diff.ts)
