/**
 * 得到类型
 * @param obj
 */
declare function type(obj: any): string;
/**
 * 判断数组
 * @param list
 */
declare function isArray(list: any): boolean;
/**
 * 截取数组
 * @param array
 * @param index
 */
declare function slice(array: any[], index: number): any[];
/**
 * 判断是否有值
 * @param value
 */
declare function truthy(value: any): boolean;
/**
 * 判断是否是string
 * @param value
 */
declare function isString(value: any): boolean;
/**
 * 模仿JQ each
 * @param array
 * @param fn
 */
declare function each(array: any[], fn: (element: any, index: number) => void): void;
/**
 * 类数组转化为数组
 * @param listLike
 */
declare function toArray(listLike: any[]): any[];
/**
 * 设置下节点属性
 * @param node
 * @param key
 * @param value
 */
declare function setAttr(node: any, key: string, value: any): any;
declare const _default: {
    each: typeof each;
    isArray: typeof isArray;
    isString: typeof isString;
    setAttr: typeof setAttr;
    slice: typeof slice;
    toArray: typeof toArray;
    truthy: typeof truthy;
    type: typeof type;
};
export default _default;
