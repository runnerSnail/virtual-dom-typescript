import { expect } from "chai";
import el from "../lib/element";

describe("test element.ts", () => {
    it("test fliter children", () => {
        const element = el("div", {}, [
            el("li", {class: "item"}, ["Item 1"]),
            undefined,
        ]);
        expect(element.children.length).equal(1);
    }),
    it("test render ", () => {
        const element = el("div", {}, [
            "xxxx",
        ]);
    });
});
