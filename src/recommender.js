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
    "nonLender": 0.35
};

const fairlyValued = {
    "lender": 0.2,
    "nonLender": 0.23
}

const allocations = [createAllocation("low", 0.01, 0.015, 0.015),
    createAllocation("med", 0.015, 0.025, 0.0275),
    createAllocation("high", 0.0175, 0.0325, 0.035)];

const totalFund = 350;

function allocation(conviction, anchorPrice, price) {
    const allocation = allocations.find((x) => x.conviction === conviction);
    const allocationPrice = allocation.targetAllocation * anchorPrice;
    const allocationShares = allocationPrice / price;
    return allocationShares;
}

function trendValuationAction(symbol, primaryTrend, valuation, soicPrice, holdingLevel, price, anchorPrice) {
    const primaryMapping = primaryMappings.find((x) => x.trend === primaryTrend && valuation === x.valuation);
    let returnValue = "";
    const isRecommendedStock = soicPrice !== 0;
    const isRecommendedAndBelowPrice = isRecommendedStock ? (price <= soicPrice) : false;

    console.log(symbol, primaryTrend, valuation, soicPrice, holdingLevel, price, anchorPrice, isRecommendedStock, isRecommendedAndBelowPrice);

    if (isRecommendedAndBelowPrice) return "BUY";

    if (price > anchorPrice) {
        returnValue = "HOLD";
    } else if (primaryMapping && primaryMapping.action === "BUY") {
        returnValue = (holdingLevel === "UND") ? "BUY" : "HOLD";
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

function checkTech(dayChange, primaryTrend, twoWeekChange) {
    if (dayChange < 1.5 && dayChange > -1.5) return (false || twoWeekCheckTech(twoWeekChange, primaryTrend));
    if ((dayChange >= 1.5 && primaryTrend === "pos") || (dayChange <= -1.5 && primaryTrend === "neg")) return (false || twoWeekCheckTech(twoWeekChange, primaryTrend));
    return true;
}

function twoWeekCheckTech(twoWeekChange, primaryTrend) {
    if (twoWeekChange < 0.05 && twoWeekChange > -0.05) return false;
    if ((twoWeekChange >= 0.05 && primaryTrend === "pos") || (twoWeekChange <= -0.05 && primaryTrend === "neg")) return false;
    return true;
}

// Don't copy this to app script
export {checkTech, valuation, trendValuationAction};
