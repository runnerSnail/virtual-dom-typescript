interface IkeyIndex {
    [key: string]: number;
}
interface IlistTransform {
    free: any[];
    keyAndIndex: any;
}
interface IMovePath {
    moves: any[];
    children: any[];
}

function getMovesPath(oldList: any[], newList: any[], key: any): IMovePath {
    // 转换数组
    const oldMap: IlistTransform = makeKeyIndexAndGetFree(oldList, key);
    // 转换数组
    const newMap: IlistTransform = makeKeyIndexAndGetFree(newList, key);
    const moves: any = [];
    /**
     * 老节点操作集合
     */
    const children = getChildren(oldList, newList, key, oldMap, newMap);
    const simulateList = children.slice(0);
    removeOperator(simulateList, moves);
    simulateListToNewlist(oldList, newList, key, simulateList, moves);
    return {
        children,
        moves,
    };
}
/**
 * 更新老的节点列表,不存在置为null,得到原始操作
 * @param oldList
 * @param newList
 * @param key
 */
function getChildren(oldList: any[], newList: any[], key: any, oldMap: IlistTransform, newMap: IlistTransform) {
    const newFree = newMap.free;
    const newIndexKey: any = newMap.keyAndIndex;
    const children: any[] = [];
    let itemKey: string;
    let index: number = 0;
    for (const ele of oldList) {
        itemKey = getItemKey(ele, key);
        if (itemKey) {
            if (!newIndexKey.hasOwnProperty(itemKey)) {
                children.push(null);
            } else {
                const newItemIndex = newIndexKey[itemKey];
                children.push(newList[newItemIndex]);
            }
        } else {
            const freeItem = newFree[index++];
            children.push(freeItem || null);
        }
    }
    return children;
}
/**
 * 移除不存在的节点
 */
function removeOperator(simulateList: any[], moves: any[]) {
    let i = 0;
    while (i < simulateList.length) {
        if (simulateList[i] === null) {
            remove(i, moves);
            removeSimulateList(i, simulateList);
        } else {
            i++;
        }
    }
}

/**
 * 添加移除操作
 * @param index
 * @param moves
 */
function remove(index: number, moves: any[]) {
    moves.push({
        index,
        type: 0,
    });
}

function simulateListToNewlist(oldList: any[], newList: any[], key: string, simulateList: any[], moves: any) {
    let i = 0;
    let j = 0;
    let item;
    let itemKey;
    const oldKeyIndex: IlistTransform = makeKeyIndexAndGetFree(oldList, key).keyAndIndex;
    while (i < newList.length) {
        item = newList[i]
        itemKey = getItemKey(item, key);

        const simulateItem = simulateList[j];
        const simulateItemKey = getItemKey(simulateItem, key);

        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++;
            } else {
                // new item, just inesrt it
                if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                    insert(i, item, moves)
                } else {
                    // if remove current simulateItem make item in right place
                    // then just remove it
                    const nextItemKey = getItemKey(simulateList[j + 1], key)
                    if (nextItemKey === itemKey) {
                        remove(i, moves);
                        removeSimulateList(j, simulateList)
                        j++; // after removing, current j is right, just jump to next one
                    } else {
                        // else insert item
                        insert(i, item, moves);
                    }
                }
            }
        } else {
            insert(i, item, moves);
        }
        i++;
    }

    // if j is not remove to the end, remove all the rest item

    let k = simulateList.length - j;
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
function removeSimulateList(index: number, simulateList: any[]) {
    simulateList.splice(index, 1);
}
/**
 * 插入节点
 */
function insert(index: number, item: any, moves: any[]) {
    const move: any = {
        index,
        item,
        type: 1,
    };
    moves.push(move);
}

/**
 * 装换成容易比较的数据结构
 * @param list 需要比较的原始数组
 * @param key 需要比较的key
 */
function makeKeyIndexAndGetFree(list: any[], key: any): IlistTransform {
    const keyAndIndex: IkeyIndex = {};
    const free: any[] = [];
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const keyValue = getItemKey(element, key);
        if (keyValue) {
            keyAndIndex[keyValue] = index;
        } else {
            free.push(element);
        }
    }
    return {
        free,
        keyAndIndex,
    };
}

/**
 * 获取字段的值
 * @param item
 * @param key 可以是字段 可以是函数
 */
function getItemKey(item: any, key: any) {
    if (!item || !key) {
        return;
    }
    return typeof key === "string"
        ? item[key]
        : key(item);
}

export default {
    getChildren,
    getMovesPath,
    makeKeyIndexAndGetFree,
};
