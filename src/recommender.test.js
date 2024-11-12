import {allocAmount, buyThreshold, checkTech, doValuation, holdingLevel, sellThreshold, trendValuationAction2} from "./recommender.js";
import {expect, it} from "@jest/globals";

it('should do valuation', function () {
    expect(doValuation("Sep-24", "Jun-24", true)).toBe(true);
});

it('trendValuationAction2', function () {
    expect(trendValuationAction2("A", "a", sellThreshold - 0.2, buyThreshold - 0.2, "UND", 288.40,1309.68)).toBe(-1);
    expect(trendValuationAction2("A", "aaaa", sellThreshold + 0.2, buyThreshold - 0.01, "UND", 927,"")).toBe(-3);
    expect(trendValuationAction2("A", "aaa", 0.61, 0.429, "UND", 927,null)).toBe(-2);
    expect(trendValuationAction2("A", "aaa", 0.628, 0.438, "UND", 910.35,null)).toBe(-2);
    expect(trendValuationAction2("A", "a", 1.39, 0.81, "", 987.85,"")).toBe("HOLD");
    expect(trendValuationAction2("A", "aa", 0.237, 0.208, "UND", 1980,"")).toBe(-2);
    expect(trendValuationAction2("A", "aa", 0.237, 0.208, "UND", 1980,1970)).toBe("HOLD");
    expect(trendValuationAction2("A", "a", 0.37, 0.34, "UND", 7169,"")).toBe(-1);
});

it('holding level', function () {
    expect(holdingLevel(2, 2.85, 360)).toBe("UND");
    expect(holdingLevel(2, 8.84, 360)).toBe("");
    expect(holdingLevel(1, 2.92, 400)).toBe("UND");
    expect(holdingLevel(2, 6.00, 400)).toBe("");
    expect(holdingLevel(2.5, 5.61, 410)).toBe("UND");
});

it('should check tech', function () {
    expect(checkTech(-0.015, "a", -0.119)).toBe(true);
    expect(checkTech(-0.0154, "aa", -0.119)).toBe(true);
    expect(checkTech(-0.0159, "a", -0.09)).toBe(true);
});

// intellect scenario
