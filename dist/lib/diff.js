"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    makeKeyIndexAndGetFree: makeKeyIndexAndGetFree,
};
