interface IlistTransform {
    free: any[];
    keyAndIndex: any;
}
/**
 * 装换成容易比较的数据结构
 * @param list 需要比较的原始数组
 * @param key 需要比较的key
 */
declare function makeKeyIndexAndGetFree(list: any[], key: any): IlistTransform;
declare const _default: {
    makeKeyIndexAndGetFree: typeof makeKeyIndexAndGetFree;
};
export default _default;
