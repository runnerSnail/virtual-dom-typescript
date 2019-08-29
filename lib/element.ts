import util from "./util";
type Node = object;
class Element {
    // 子节点个数
    public count: number = 0;
    // 节点名字
    public tagName: string = "";
    // 节点属性
    public props: any;
    public children: any[] = [];

    constructor(tagName: string, props?: any, children?: any) {
        this.tagName = tagName;
        this.props = props || {};
        this.init(children);
    }

    /**
     * 过滤无意义节点列表
     * @param children nodelist
     */
    public filterChildren(children: any[]) {
        this.children = children.filter(util.truthy);
    }

    /**
     * 统计节点数
     * @param children nodelist
     */
    public init(children: any) {
        (children && util.isArray(children)) ? this.filterChildren(children) : void 0;
        util.each(this.children, (child: any, index: number) => {
            this.count++;
            if (child instanceof Element) {
                this.count += child.count;
            } else {
                this.children[index] = "" + child;
            }
        });
    }

    public render(): Node {
        const ele = document.createElement(this.tagName);
        const props = this.props;
        for (const propName in props) {
            if (props.hasOwnProperty(propName)) {
                const propValue = props[propName];
                util.setAttr(el, propName, propValue);
            }
        }
        util.each(this.children, (child: any) => {
            const childEl = (child instanceof Element)
                ? child.render()
                : document.createTextNode(child);
            ele.appendChild(childEl as any);
        });
        return el;
    }
}

export default function el(tagName: string, props: any, children: any) {
    return new Element(tagName, props, children);
}
