"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 测试模块
var chai_1 = require("chai");
var util_1 = __importDefault(require("../lib/util"));
describe("util function test", function () {
    it("get type", function () {
        var result = util_1.default.type("ss");
        chai_1.expect(result).to.equal("String");
    });
    it("test each", function () {
        var arr = [1, 2, 3];
        var result = util_1.default.each(arr, function (item, index) {
            chai_1.expect(item).to.equal(arr[index]);
        });
        // 继续补充测试用例
    });
});
