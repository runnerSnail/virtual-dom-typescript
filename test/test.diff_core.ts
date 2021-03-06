import { expect } from "chai";
import chai from "chai";
import diff_core from "../lib/diff_core";
chai.should();
type node = BinaryTreeNode | undefined;
let index = 0;
const DFSARR: any[] = [];
const BFSARR: any[] = [];
const BFSARRVAL: any[] = [];

class BinaryTreeNode {
    public val: string = "";
    public left: node;
    public right: node;
}

// tslint:disable-next-line: no-shadowed-variable
function createTree(node: any, arr: any[]) {
    const val = arr[index++];
    if (val !== "#") {
        node.val = val;
        node.left = new BinaryTreeNode();
        node.right = new BinaryTreeNode();
        if (node.left) { createTree(node.left, arr); }
        if (node.right) { createTree(node.right, arr); }
    }
}
/**
 * 深度优先
 * @param root
 */
function DFS(root: any) {
    if (root.val !== "#") {
        DFSARR.push(root.val);
    }
    if (root.left && root.left.val) { DFS(root.left); }
    if (root.right && root.right.val) { DFS(root.right); }
}

/**
 * 广度优先
 * @param root
 */
function BFS(root: any) {
    BFSARR.push(root);
    while (BFSARR.length > 0) {
        const rNode = BFSARR.shift();
        BFSARRVAL.push(rNode.val);
        if (rNode.left.val) { BFSARR.push(rNode.left); }
        if (rNode.right.val) { BFSARR.push(rNode.right); }
    }
}

const node = new BinaryTreeNode();

/**
 * 根据move转换列表
 * @param oldList
 * @param newList
 * @param moves
 */
function transform(oldList: any[], newList: any[], moves: any[]) {
    moves.forEach((move: any) => {
        if (move.type === 0) {
            oldList.splice(move.index, 1);
        } else if (move.type === 1) {
            oldList.splice(move.index, 0, move.item);
        } else {
            throw Error("不存在的操作");
        }
    });
    expect(oldList).to.deep.members(
        newList,
    );
}

describe("test diff", () => {
    it("test diff algorithm", () => {
        const before = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
        const after = [{ id: 2 }, { id: 3 }, { id: 1 }];
        // 检测
        const diff = diff_core.getMovesPath(before, after, "id");
        // 需要5步操作可以转化为原来的数组;
        expect(diff.moves.length).equal(5);
        transform(before, after, diff.moves);

    });

    it("test create node", () => {
        // 检测创建树
        const arr = ["A", "B", "D", "#", "#", "E", "#", "#", "C", "F", "#", "#", "G", "#", "#"];
        createTree(node, arr);
        // @ts-ignore
        expect(node.left.right.val).equal("E");
    });

    it("test DFS", () => {
        DFS(node);
        // 深度优先遍历
        expect(DFSARR).to.have.same.members(
            ["A", "B", "D", "E", "C", "F", "G"],
        );
    });

    it("test BFS", () => {
        // 广度优先遍历
        BFS(node);
        expect(BFSARRVAL).to.have.same.members(
            ["A", "B", "C", "D", "E", "F", "G"],
        );
    });

    it("test diff_core makeKeyIndexAndGetFree", () => {
        // 检测数据转化的正确性
        const oldList = [{ id: "A" }, { id: "B" }, { id: "C" }, { idx: "xxx" }];
        diff_core.makeKeyIndexAndGetFree(oldList, "id").keyAndIndex.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
        diff_core.makeKeyIndexAndGetFree(oldList, "id").free.should.be.deep.equal([{ idx: "xxx" }]);

        const map = diff_core.makeKeyIndexAndGetFree(oldList, (item: any) => {
            return item.id;
        }).keyAndIndex;
        map.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
    });
});
