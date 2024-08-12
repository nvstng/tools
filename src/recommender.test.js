import {doValuation, trendValuationAction, valuation} from "./recommender.js";
import expect from "expect";

it('check', function () {
    // Negative trend
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.27, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.27, "nonLender"), 0, 'UND', 400, 419.40)).toBe("%% SELL");

    // Neutral trend
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.33, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.34, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.40, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.41, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");

    // Positive trend
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.33, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.34, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.40, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");
    expect(trendValuationAction("BCONCEPTS", "pos", valuation(0.41, "nonLender"), 0, 'UND', 653.9, 419.40)).toBe("BUY");

    // debug
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.17, "nonLender"), 0, 'UND', 1481, 1358.00)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.35, "nonLender"), 0, '', 850.2, 810.48)).toBe("HOLD");
    expect(trendValuationAction("BCONCEPTS", "neg", valuation(0.40, "nonLender"), 0, '', 850.2, 0)).toBe("% SELL");
    expect(trendValuationAction("BCONCEPTS", "neu", valuation(0.43, "nonLender"), 0, 'UND', 703, 714.84)).toBe("BUY");
});

it('should do valuation', function () {
    expect(doValuation("Jun-24", 0)).toBe(false);
});
