"use strict";

// 测试模块
import { expect } from "chai";
import util from "../lib/util";

describe("util function test", () => {
  it("get type", () => {
    const result = util.type("ss");
    expect(result).to.equal("String");
  });

  it("test each", () => {
    const arr = [1, 2, 3];
    const result = util.each(arr, (item: number, index: number) => {
      expect(item).to.equal(arr[index]);
    });
    // 继续补充测试用例
  });
});
