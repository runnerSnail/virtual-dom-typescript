"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMovesPath(oldList, newList, key) {
    // 转换数组
    var oldMap = makeKeyIndexAndGetFree(oldList, key);
    // 转换数组
    var newMap = makeKeyIndexAndGetFree(newList, key);
    var moves = [];
    /**
     * 老节点操作集合
     */
    var children = getChildren(oldList, newList, key, oldMap, newMap);
    var simulateList = children.slice(0);
    removeOperator(simulateList, moves);
    simulateListToNewlist(oldList, newList, key, simulateList, moves);
    return {
        children: children,
        moves: moves,
    };
}
/**
 * 更新老的节点列表,不存在置为null,得到原始操作
 * @param oldList
 * @param newList
 * @param key
 */
function getChildren(oldList, newList, key, oldMap, newMap) {
    var newFree = newMap.free;
    var newIndexKey = newMap.keyAndIndex;
    var children = [];
    var itemKey;
    var index = 0;
    for (var _i = 0, oldList_1 = oldList; _i < oldList_1.length; _i++) {
        var ele = oldList_1[_i];
        itemKey = getItemKey(ele, key);
        if (itemKey) {
            if (!newIndexKey.hasOwnProperty(itemKey)) {
                children.push(null);
            }
            else {
                var newItemIndex = newIndexKey[itemKey];
                children.push(newList[newItemIndex]);
            }
        }
        else {
            var freeItem = newFree[index++];
            children.push(freeItem || null);
        }
    }
    return children;
}
/**
 * 移除不存在的节点
 */
function removeOperator(simulateList, moves) {
    var i = 0;
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            remove(i, moves);
            removeSimulateList(i, simulateList);
        }
        else {
            i++;
        }
    }
}
/**
 * 添加移除操作
 * @param index
 * @param moves
 */
function remove(index, moves) {
    moves.push({
        index: index,
        type: 0,
    });
}
function simulateListToNewlist(oldList, newList, key, simulateList, moves) {
    var i = 0;
    var j = 0;
    var item;
    var itemKey;
    var oldKeyIndex = makeKeyIndexAndGetFree(oldList, key).keyAndIndex;
    while (i < newList.length) {
        item = newList[i];
        itemKey = getItemKey(item, key);
        var simulateItem = simulateList[j];
        var simulateItemKey = getItemKey(simulateItem, key);
        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++;
            }
            else {
                // new item, just inesrt it
                if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                    insert(i, item, moves);
                }
                else {
                    // if remove current simulateItem make item in right place
                    // then just remove it
                    var nextItemKey = getItemKey(simulateList[j + 1], key);
                    if (nextItemKey === itemKey) {
                        remove(i, moves);
                        removeSimulateList(j, simulateList);
                        j++; // after removing, current j is right, just jump to next one
                    }
                    else {
                        // else insert item
                        insert(i, item, moves);
                    }
                }
            }
        }
        else {
            insert(i, item, moves);
        }
        i++;
    }
    // if j is not remove to the end, remove all the rest item
    var k = simulateList.length - j;
    while (j++ < simulateList.length) {
        k--;
        remove(k + i, moves);
    }
}
/**
 * 变更模拟操作列表
 * @param index
 * @param simulateList
 */
function removeSimulateList(index, simulateList) {
    simulateList.splice(index, 1);
}
/**
 * 插入节点
 */
function insert(index, item, moves) {
    var move = {
        index: index,
        item: item,
        type: 1,
    };
    moves.push(move);
}
/**
 * 装换成容易比较的数据结构
 * @param list 需要比较的原始数组
 * @param key 需要比较的key
 */
function makeKeyIndexAndGetFree(list, key) {
    var keyAndIndex = {};
    var free = [];
    for (var index = 0; index < list.length; index++) {
        var element = list[index];
        var keyValue = getItemKey(element, key);
        if (keyValue) {
            keyAndIndex[keyValue] = index;
        }
        else {
            free.push(element);
        }
    }
    return {
        free: free,
        keyAndIndex: keyAndIndex,
    };
}
/**
 * 获取字段的值
 * @param item
 * @param key 可以是字段 可以是函数
 */
function getItemKey(item, key) {
    if (!item || !key) {
        return;
    }
    return typeof key === "string"
        ? item[key]
        : key(item);
}
exports.default = {
    getChildren: getChildren,
    getMovesPath: getMovesPath,
    makeKeyIndexAndGetFree: makeKeyIndexAndGetFree,
};
