import {doValuation, trendValuationAction2} from "./recommender.js";
import {expect, it} from "@jest/globals";

it('should do valuation', function () {
    expect(doValuation("Jun-24", 0)).toBe(false);
});

it('trendValuationAction2', function () {
    expect(trendValuationAction2("AAPL", "a", 0.26, 0.21, "UND", 288.40,1309.68)).toBe(-1);
});
