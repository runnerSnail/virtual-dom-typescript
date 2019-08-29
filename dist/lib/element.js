"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var Element = /** @class */ (function () {
    function Element(tagName, props, children) {
        // 子节点个数
        this.count = 0;
        // 节点名字
        this.tagName = "";
        this.children = [];
        this.tagName = tagName;
        this.props = props || {};
        this.init(children);
    }
    /**
     * 过滤无意义节点列表
     * @param children nodelist
     */
    Element.prototype.filterChildren = function (children) {
        this.children = children.filter(util_1.default.truthy);
    };
    /**
     * 统计节点数
     * @param children nodelist
     */
    Element.prototype.init = function (children) {
        var _this = this;
        (children && util_1.default.isArray(children)) ? this.filterChildren(children) : void 0;
        util_1.default.each(this.children, function (child, index) {
            _this.count++;
            if (child instanceof Element) {
                _this.count += child.count;
            }
            else {
                _this.children[index] = "" + child;
            }
        });
    };
    Element.prototype.render = function () {
        var ele = document.createElement(this.tagName);
        var props = this.props;
        for (var propName in props) {
            if (props.hasOwnProperty(propName)) {
                var propValue = props[propName];
                util_1.default.setAttr(el, propName, propValue);
            }
        }
        util_1.default.each(this.children, function (child) {
            var childEl = (child instanceof Element)
                ? child.render()
                : document.createTextNode(child);
            ele.appendChild(childEl);
        });
        return el;
    };
    return Element;
}());
function el(tagName, props, children) {
    return new Element(tagName, props, children);
}
exports.default = el;
