declare type Node = object;
declare class Element {
    count: number;
    tagName: string;
    props: any;
    children: any[];
    constructor(tagName: string, props?: any, children?: any);
    /**
     * 过滤无意义节点列表
     * @param children nodelist
     */
    filterChildren(children: any[]): void;
    /**
     * 统计节点数
     * @param children nodelist
     */
    init(children: any): void;
    render(): Node;
}
export default function el(tagName: string, props: any, children: any): Element;
export {};
