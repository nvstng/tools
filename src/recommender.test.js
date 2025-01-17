import {allocAmount, buyThreshold, checkTech, doValuation, holdingLevel, sellThreshold, sellThresholdDespiteTech, trendValuationAction2} from "./recommender.js";
import {expect, it} from "@jest/globals";

it('should do valuation', function () {
    expect(doValuation("Sep-24", "Jun-24", true)).toBe(true);
});

it('trendValuationAction2', function () {
    expect(trendValuationAction2("A", "a", buyThreshold - 0.2, "UND", 288.40, 1309.68, 0.02)).toBe(-1);
    expect(trendValuationAction2("A", "aaaa", buyThreshold - 0.01, "UND", 927, "", -0.02)).toBe(-3);
    expect(trendValuationAction2("A", "aaa", 0.429, "UND", 927, null, 0.02)).toBe(-2);
    expect(trendValuationAction2("A", "aaa", 0.438, "UND", 910.35, null, -0.02)).toBe(-2);
    expect(trendValuationAction2("A", "a", 0.81, "", 987.85, "", 0.02)).toBe("HOLD");
    expect(trendValuationAction2("A", "aa", 0.208, "UND", 1980, "", 0.02)).toBe(-2);
    expect(trendValuationAction2("A", "aa", 0.208, "UND", 1980, "", -0.06)).toBe(-2);
    expect(trendValuationAction2("A", "aa", 0.208, "UND", 1980, 1970, -0.02)).toBe("HOLD");
    expect(trendValuationAction2("A", "aa", 0.208, "UND", 2010, 1970, 0.02)).toBe("HOLD");
    expect(trendValuationAction2("A", "a", 0.34, "UND", 7169, "", 0.02)).toBe("HOLD");
    expect(trendValuationAction2("A", "a", (sellThresholdDespiteTech - 0.01), "UND", 300, null, -0.02)).toBe(-2);
    expect(trendValuationAction2("A", "aa", (sellThresholdDespiteTech - 0.01), "UND", 300, null, -0.02)).toBe(-3);
    expect(trendValuationAction2("A", "a", (sellThresholdDespiteTech - 0.01), "UND", 291.50, 296.00, -0.02)).toBe("HOLD");
});

it('holding level', function () {
    expect(holdingLevel(2, 2.85, 360)).toBe("UND");
    expect(holdingLevel(2, 8.84, 360)).toBe("");
    expect(holdingLevel(1, 2.92, 400)).toBe("UND");
    expect(holdingLevel(2, 8.00, 400)).toBe("");
    expect(holdingLevel(2.5, 5.61, 410)).toBe("UND");
});

it('should check tech', function () {
    expect(checkTech(-0.015, "a", -0.119)).toBe(true);
    expect(checkTech(-0.0154, "aa", -0.119)).toBe(true);
    expect(checkTech(-0.0159, "a", -0.09)).toBe(true);
});

// intellect scenario
