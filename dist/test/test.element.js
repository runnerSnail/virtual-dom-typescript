"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var element_1 = __importDefault(require("../lib/element"));
describe("test element.ts", function () {
    it("test fliter children", function () {
        var element = element_1.default("div", {}, [
            element_1.default("li", { class: "item" }, ["Item 1"]),
            undefined,
        ]);
        chai_1.expect(element.children.length).equal(1);
    }),
        it("test render ", function () {
            var element = element_1.default("div", {}, [
                "xxxx",
            ]);
        });
});
