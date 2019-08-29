/**
 * 得到类型
 * @param obj
 */
function type(obj: any): string {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, "");
}

/**
 * 判断数组
 * @param list
 */
function isArray(list: any): boolean {
    return type(list) === "Array";
}

/**
 * 截取数组
 * @param array
 * @param index
 */
function slice(array: any[], index: number): any[] {
    return Array.prototype.slice.call(array, index);
}

/**
 * 判断是否有值
 * @param value
 */
function truthy(value: any): boolean {
    return !!value;
}

/**
 * 判断是否是string
 * @param value
 */
function isString(value: any): boolean {
    return type(value) === "String";
}

/**
 * 模仿JQ each
 * @param array
 * @param fn
 */
function each(array: any[], fn: (element: any, index: number) => void): void {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i);
    }
}

/**
 * 类数组转化为数组
 * @param listLike
 */
function toArray(listLike: any[]): any[] {
    if (!listLike) { return []; }
    const list = [];
    for (let i = 0, len = listLike.length; i < len; i++) {
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
function setAttr(node: any, key: string, value: any): any {
    switch (key) {
        // 样式
        case "style":
            node.style.cssText = value;
            break;
        // 设置值 input
        case "value":
            let tagName = node.tagName || "";
            tagName = tagName.toLowerCase();
            if (
                tagName === "input" || tagName === "textarea"
            ) {
                node.value = value;
            } else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

export default {
    each,
    isArray,
    isString,
    setAttr,
    slice,
    toArray,
    truthy,
    type,
};
