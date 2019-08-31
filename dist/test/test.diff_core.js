"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai_2 = __importDefault(require("chai"));
var diff_core_1 = __importDefault(require("../lib/diff_core"));
chai_2.default.should();
var index = 0;
var DFSARR = [];
var BFSARR = [];
var BFSARRVAL = [];
var BinaryTreeNode = /** @class */ (function () {
    function BinaryTreeNode() {
        this.val = "";
    }
    return BinaryTreeNode;
}());
// tslint:disable-next-line: no-shadowed-variable
function createTree(node, arr) {
    var val = arr[index++];
    if (val !== "#") {
        node.val = val;
        node.left = new BinaryTreeNode();
        node.right = new BinaryTreeNode();
        if (node.left) {
            createTree(node.left, arr);
        }
        if (node.right) {
            createTree(node.right, arr);
        }
    }
}
/**
 * 深度优先
 * @param root
 */
function DFS(root) {
    if (root.val !== "#") {
        DFSARR.push(root.val);
    }
    if (root.left && root.left.val) {
        DFS(root.left);
    }
    if (root.right && root.right.val) {
        DFS(root.right);
    }
}
/**
 * 广度优先
 * @param root
 */
function BFS(root) {
    BFSARR.push(root);
    while (BFSARR.length > 0) {
        var rNode = BFSARR.shift();
        BFSARRVAL.push(rNode.val);
        if (rNode.left.val) {
            BFSARR.push(rNode.left);
        }
        if (rNode.right.val) {
            BFSARR.push(rNode.right);
        }
    }
}
var node = new BinaryTreeNode();
/**
 * 根据move转换列表
 * @param oldList
 * @param newList
 * @param moves
 */
function transform(oldList, newList, moves) {
    moves.forEach(function (move) {
        if (move.type === 0) {
            oldList.splice(move.index, 1);
        }
        else if (move.type === 1) {
            oldList.splice(move.index, 0, move.item);
        }
        else {
            throw Error("不存在的操作");
        }
    });
    chai_1.expect(oldList).to.deep.members(newList);
}
describe("test diff", function () {
    it("test diff algorithm", function () {
        var before = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
        var after = [{ id: 2 }, { id: 3 }, { id: 1 }];
        // 检测
        var diff = diff_core_1.default.getMovesPath(before, after, "id");
        // 需要5步操作可以转化为原来的数组;
        chai_1.expect(diff.moves.length).equal(5);
        transform(before, after, diff.moves);
    });
    it("test create node", function () {
        // 检测创建树
        var arr = ["A", "B", "D", "#", "#", "E", "#", "#", "C", "F", "#", "#", "G", "#", "#"];
        createTree(node, arr);
        // @ts-ignore
        chai_1.expect(node.left.right.val).equal("E");
    });
    it("test DFS", function () {
        DFS(node);
        // 深度优先遍历
        chai_1.expect(DFSARR).to.have.same.members(["A", "B", "D", "E", "C", "F", "G"]);
    });
    it("test BFS", function () {
        // 广度优先遍历
        BFS(node);
        chai_1.expect(BFSARRVAL).to.have.same.members(["A", "B", "C", "D", "E", "F", "G"]);
    });
    it("test diff_core makeKeyIndexAndGetFree", function () {
        // 检测数据转化的正确性
        var oldList = [{ id: "A" }, { id: "B" }, { id: "C" }, { idx: "xxx" }];
        diff_core_1.default.makeKeyIndexAndGetFree(oldList, "id").keyAndIndex.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
        diff_core_1.default.makeKeyIndexAndGetFree(oldList, "id").free.should.be.deep.equal([{ idx: "xxx" }]);
        var map = diff_core_1.default.makeKeyIndexAndGetFree(oldList, function (item) {
            return item.id;
        }).keyAndIndex;
        map.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
    });
});
