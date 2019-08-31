interface IlistTransform {
    free: any[];
    keyAndIndex: any;
}
interface IMovePath {
    moves: any[];
    children: any[];
}
declare function getMovesPath(oldList: any[], newList: any[], key: any): IMovePath;
/**
 * 更新老的节点列表,不存在置为null,得到原始操作
 * @param oldList
 * @param newList
 * @param key
 */
declare function getChildren(oldList: any[], newList: any[], key: any, oldMap: IlistTransform, newMap: IlistTransform): any[];
/**
 * 装换成容易比较的数据结构
 * @param list 需要比较的原始数组
 * @param key 需要比较的key
 */
declare function makeKeyIndexAndGetFree(list: any[], key: any): IlistTransform;
declare const _default: {
    getChildren: typeof getChildren;
    getMovesPath: typeof getMovesPath;
    makeKeyIndexAndGetFree: typeof makeKeyIndexAndGetFree;
};
export default _default;
