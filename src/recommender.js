const primaryMappings = [
    {
        "trend": "neg",
        "valuation": "under",
        "action": "% SELL"
    },
    {
        "trend": "neg",
        "valuation": "fair",
        "action": "%% SELL"
    },
    {
        "trend": "neg",
        "valuation": "over",
        "action": "SELL"
    },
    {
        "trend": "neu",
        "valuation": "under",
        "action": "BUY"
    },
    {
        "trend": "neu",
        "valuation": "fair",
        "action": "HOLD"
    },
    {
        "trend": "neu",
        "valuation": "over",
        "action": "% SELL"
    },
    {
        "trend": "pos",
        "valuation": "under",
        "action": "BUY"
    },
    {
        "trend": "pos",
        "valuation": "fair",
        "action": "HOLD"
    },
    {
        "trend": "pos",
        "valuation": "over",
        "action": "HOLD"
    }
];

function createAllocation(conviction, minAllocation, targetAllocation, maxAllocation) {
    return {
        "conviction": conviction,
        "minAllocation": minAllocation,
        "targetAllocation": targetAllocation,
        "maxAllocation": maxAllocation
    }
}

const underValued = {
    "lender": 0.30,
    "nonLender": 0.39
};

const fairlyValued = {
    "lender": 0.2,
    "nonLender": 0.25
}

const allocations = [createAllocation("low", 0.01, 0.015, 0.015),
    createAllocation("med", 0.015, 0.025, 0.0275),
    createAllocation("high", 0.0175, 0.0325, 0.035)];

const totalFund = 350;

function allocation(conviction, anchorPrice, price) {
    const allocation = allocations.find((x) => x.conviction === conviction);
    const allocationPrice = allocation.targetAllocation * anchorPrice;
    return allocationPrice / price;
}

function trendValuationAction(symbol, primaryTrend, valuation, soicPrice, holdingLevel, price, anchorPrice) {
    const primaryMapping = primaryMappings.find((x) => x.trend === primaryTrend && valuation === x.valuation);
    let returnValue = "";
    const belowHoldingLevel = holdingLevel === 'UND';
    const useAnchorPriceToDecide = (["neg"].includes(primaryTrend) || (["neu"].includes(primaryTrend) && ["over", "fair"].includes(valuation)));
    const anchorPricePresent = anchorPrice && anchorPrice !== 0;
    const priceAboveAnchor = price > anchorPrice;

    console.log(symbol, primaryTrend, valuation, holdingLevel, price, anchorPrice, belowHoldingLevel, useAnchorPriceToDecide, priceAboveAnchor);

    if (anchorPricePresent && useAnchorPriceToDecide && priceAboveAnchor) {
        returnValue = "HOLD";
    } else if (primaryMapping && primaryMapping.action === "BUY") {
        returnValue = belowHoldingLevel ? "BUY" : "HOLD";
    } else if (primaryMapping) {
        returnValue = primaryMapping.action;
    } else {
        returnValue += `ERROR`;
    }
    return returnValue;
}

function valuation(x, businessType = "nonLender") {
    if (x >= underValued[businessType]) return "under";
    if (x >= fairlyValued[businessType]) return "fair";
    return "over";
}

function checkTech(dayChange, primaryTrend, twoWeekChange, soicPrice) {
    const noCheckRange = dayChange < 1.5 && dayChange > -1.5;

    if (noCheckRange) return (false || twoWeekCheckTech(twoWeekChange, primaryTrend));
    if ((dayChange >= 1.5 && primaryTrend === "pos") || (dayChange <= -1.5 && primaryTrend === "neg")) return (false || twoWeekCheckTech(twoWeekChange, primaryTrend));
    return true;
}

function twoWeekCheckTech(twoWeekChange, primaryTrend) {
    if (twoWeekChange < 0.05 && twoWeekChange > -0.05) return false;
    if ((twoWeekChange >= 0.05 && primaryTrend === "pos") || (twoWeekChange <= -0.05 && primaryTrend === "neg")) return false;
    return true;
}

function doValuation(quarterDoneIn, soicPrice, currentQuarter = "Jun-24", resultsOut = true) {
    // const isRecommendedStock = soicPrice !== 0;
    // if (isRecommendedStock) return false;

    console.log("doValuation", soicPrice, quarterDoneIn, soicPrice, resultsOut);
    return resultsOut && quarterDoneIn !== currentQuarter;
}

// Don't copy this to app script
export {checkTech, valuation, trendValuationAction, doValuation};
