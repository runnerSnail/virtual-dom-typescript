"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai_2 = __importDefault(require("chai"));
var diff_1 = __importDefault(require("../lib/diff"));
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
describe("test diff", function () {
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
    it("test diff makeKeyIndexAndGetFree", function () {
        // 检测数据转化的正确性
        var oldList = [{ id: "A" }, { id: "B" }, { id: "C" }, { idx: "xxx" }];
        diff_1.default.makeKeyIndexAndGetFree(oldList, "id").keyAndIndex.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
        diff_1.default.makeKeyIndexAndGetFree(oldList, "id").free.should.be.deep.equal([{ idx: "xxx" }]);
        var map = diff_1.default.makeKeyIndexAndGetFree(oldList, function (item) {
            return item.id;
        }).keyAndIndex;
        map.should.be.deep.equal({
            A: 0,
            B: 1,
            C: 2,
        });
    });
});
