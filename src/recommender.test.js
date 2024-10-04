import {allocAmount, doValuation, holdingLevel, trendValuationAction2} from "./recommender.js";
import {expect, it} from "@jest/globals";

it('should do valuation', function () {
    expect(doValuation("Jun-24", 0)).toBe(false);
});

it('trendValuationAction2', function () {
    expect(trendValuationAction2("AAPL", "a", 0.26, 0.21, "UND", 288.40,1309.68)).toBe(-1);
    expect(trendValuationAction2("AAPL", "aaaa", 0.61, 0.429, "UND", 927,"")).toBe(-3);
    expect(trendValuationAction2("AAPL", "aaa", 0.61, 0.429, "UND", 927,null)).toBe(-2);
});

it('holding level', function () {
    expect(holdingLevel(2, 2.85, 360)).toBe("UND");
    expect(holdingLevel(2, 8.84, 360)).toBe("");
});

// intellect scenario
