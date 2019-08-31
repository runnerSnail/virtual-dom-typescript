// import patch from './patch';
import diff_core from "./diff_core";
import { OperatorFlag } from "./patch";
import util from "./util";

/**
 * diff函数，比较两个虚拟dom树
 * @param oldTree
 * @param newTree
 */
export default function diff(oldTree: any, newTree: any) {

    // dom节点的索引

    const index: number = 0;

    // 记录每个节点的差异

    const patch = {};

    // 处理差异

    return patch;

}

function dfsWalk(oldNode: any, newNode: any, index: number, patches: any) {
    const currentPatch: Patch[] = [];

    // 第一种情况 新节点是null,旧节点将被移除
    if (newNode === null) {

    } else if (util.isString(oldNode) && util.isString(newNode)) {
        if (newNode != oldNode) {
            currentPatch.push({
                type: OperatorFlag.TEXT,
                content: newNode,
            });
        }
    } else if (
        oldNode.tagName === newNode.tagName &&
        oldNode.key === newNode.key
    ) {
        // 得到不同的属性
        const propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({ type: OperatorFlag.PROPS, props: propsPatches });
        }
        // 比较未被忽略的children节点
        if (!isIgnoreChildren(newNode)) {
            diffChildren(
                oldNode.children,
                newNode.children,
                index,
                patches,
                currentPatch,
            );
        }
    } else {
        currentPatch.push({ type: OperatorFlag.REPLACE, node: newNode })
    }

    // 记录当前节点的更改;
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

interface Patch {
    type: OperatorFlag.TEXT | OperatorFlag.PROPS | OperatorFlag.REORDER | OperatorFlag.REPLACE;
    content?: any;
    props?: any;
    node?: any;
}

/**
 * 比较属性的差异
 * @param oldNode
 * @param newNode
 */
function diffProps(oldNode: any, newNode: any) {
    let count = 0;

    // 差异对象
    const propsPatches: any = {};

    // 得到节点属性
    const oldProps = oldNode.props;
    const newProps = newNode.props;
    // 统计两棵树的差异
    for (const key in oldProps) {
        if (oldProps.hasOwnProperty(key)) {
            const value = oldProps[key];
            if (newProps[key] !== value) {
                count++;
                propsPatches[key] = newProps[key];
            }
        }
    }

    for (const key in newProps) {
        if (!oldProps.hasOwnProperty(key)) {
            count++;
            propsPatches[key] = newProps[key];
        }
    }

    // If properties all are identical
    if (count === 0) {
        return null;
    }

    return propsPatches;

}

/**
 * 是否为忽略节点
 * @param node
 */
function isIgnoreChildren(node: any) {
    return (node.props && node.props.hasOwnProperty("ignore"));
}

/**
 * 递归判断不同的子节点
 * @param oldChildren
 * @param newChildren
 * @param index
 * @param patches
 * @param currentPatch
 */
function diffChildren(oldChildren: any, newChildren: any, index: number, patches: any, currentPatch: any[]) {
    const diffs = diff_core.getMovesPath(oldChildren, newChildren, "key");
    // 得到 旧树中保留的节点
    newChildren = diffs.children;
    // 得到旧树children需要进行的dom操作

    if (diffs.moves.length) {
        const reorderPatch = { type: OperatorFlag.REORDER, moves: diffs.moves };
        currentPatch.push(reorderPatch);
    }

    let leftNode: any = null;
    let currentNodeIndex = index;

    // 循环比较节点不同
    util.each(oldChildren, (child, i) => {
        const newChild: any = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
        dfsWalk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });

}
