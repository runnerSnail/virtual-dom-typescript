"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 得到类型
 * @param obj
 */
function type(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, "");
}
/**
 * 判断数组
 * @param list
 */
function isArray(list) {
    return type(list) === "Array";
}
/**
 * 截取数组
 * @param array
 * @param index
 */
function slice(array, index) {
    return Array.prototype.slice.call(array, index);
}
/**
 * 判断是否有值
 * @param value
 */
function truthy(value) {
    return !!value;
}
/**
 * 判断是否是string
 * @param value
 */
function isString(value) {
    return type(value) === "String";
}
/**
 * 模仿JQ each
 * @param array
 * @param fn
 */
function each(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i);
    }
}
/**
 * 类数组转化为数组
 * @param listLike
 */
function toArray(listLike) {
    if (!listLike) {
        return [];
    }
    var list = [];
    for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i]);
    }
    return list;
}
/**
 * 设置下节点属性
 * @param node
 * @param key
 * @param value
 */
function setAttr(node, key, value) {
    switch (key) {
        // 样式
        case "style":
            node.style.cssText = value;
            break;
        // 设置值 input
        case "value":
            var tagName = node.tagName || "";
            tagName = tagName.toLowerCase();
            if (tagName === "input" || tagName === "textarea") {
                node.value = value;
            }
            else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}
exports.default = {
    each: each,
    isArray: isArray,
    isString: isString,
    setAttr: setAttr,
    slice: slice,
    toArray: toArray,
    truthy: truthy,
    type: type,
};
