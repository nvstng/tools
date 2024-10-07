import {allocAmount, buyThreshold, doValuation, holdingLevel, sellThreshold, trendValuationAction2} from "./recommender.js";
import {expect, it} from "@jest/globals";

it('should do valuation', function () {
    expect(doValuation("Jun-24", 0)).toBe(false);
});

it('trendValuationAction2', function () {
    expect(trendValuationAction2("A", "a", sellThreshold - 0.2, buyThreshold - 0.2, "UND", 288.40,1309.68)).toBe(-1);
    expect(trendValuationAction2("A", "aaaa", sellThreshold + 0.2, buyThreshold - 0.01, "UND", 927,"")).toBe(-3);
    expect(trendValuationAction2("A", "aaa", 0.61, 0.429, "UND", 927,null)).toBe(-2);
    expect(trendValuationAction2("A", "aaa", 0.628, 0.438, "UND", 910.35,null)).toBe(-2);
});

it('holding level', function () {
    expect(holdingLevel(2, 2.85, 360)).toBe("UND");
    expect(holdingLevel(2, 8.84, 360)).toBe("");
});

// intellect scenario
