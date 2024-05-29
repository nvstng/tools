import {trendValuationAction, valuation} from "./recommender.js";
import expect from "expect";

it('check', function () {
    // Negative trend
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.27, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.27, "nonLender"), 0, 'UND', 400, 419.40)).toBe("%% SELL");

    // Neutral trend
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.33, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.34, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.35, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.36, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");

    // Positive trend
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.33, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.34, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.35, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.36, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");

    // SOIC
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.36, "nonLender"), 700, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.32, "nonLender"), 700, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.32, "nonLender"), 700, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.32, "nonLender"), 700, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.32, "nonLender"), 700, '', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.32, "nonLender"), 700, null, 653.9, 419.40)).toBe("HOLD");

    // debug
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.32, "nonLender"), 1300, 'UND', 1160, 744.61)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.52, "nonLender"), 810, 'UND', 909, 742)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.17, "nonLender"), 0, 'UND', 1481, 1358.00)).toBe("HOLD");
    expect(trendValuationAction("HDFCBANK", "neg", valuation(0.3, "lender"), 100, '', 94.8, 87.8)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.35, "nonLender"), 0, '', 850.2, 810.48)).toBe("HOLD");
});
