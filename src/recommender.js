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

function valuation(x, businessType = "nonLender") {
    if (x >= underValued[businessType]) return "under";
    if (x >= fairlyValued[businessType]) return "fair";
    return "over";
}

function checkTech(dayChange, tech, twoWeekChange) {
    const noCheckRange = dayChange < 1.5 && dayChange > -1.5;

    if (noCheckRange) return (false || twoWeekCheckTech(twoWeekChange, tech));
    if ((dayChange >= 1.5 && tech === "a") || (dayChange <= -1.5 && ["aa", "aaa", "aaa"].includes(tech))) return (false || twoWeekCheckTech(twoWeekChange, tech));
    return true;
}

function twoWeekCheckTech(twoWeekChange, tech) {
    if (twoWeekChange < 0.05 && twoWeekChange > -0.05) return false;
    if ((twoWeekChange >= 0.05 && tech === "a") || (twoWeekChange <= -0.05 && ["aa", "aaa", "aaa"].includes(tech))) return false;
    return true;
}

function doValuation(quarterDoneIn, soicPrice, currentQuarter = "Jun-24", resultsOut = true) {
    // const isRecommendedStock = soicPrice !== 0;
    // if (isRecommendedStock) return false;

    console.log("doValuation", soicPrice, quarterDoneIn, soicPrice, resultsOut);
    return resultsOut && quarterDoneIn !== currentQuarter;
}

const buyValue = 0.45;
const sellValue = 0.40;

function trendValuationAction2(symbol, tech = "", twoYearExpectedReturn, threeYearExpectedReturn, holdingLevel, price, anchorPrice) {
    const belowHoldingLevel = holdingLevel === 'UND';
    let returnValue = "";
    const anchorPricePresent = anchorPrice && anchorPrice !== 0;
    const priceAboveAnchor = price > anchorPrice;

    console.log(symbol, tech, holdingLevel, price, anchorPrice, belowHoldingLevel, priceAboveAnchor);

    if (anchorPricePresent && priceAboveAnchor) {
        returnValue = "HOLD";
    } else if (threeYearExpectedReturn >= buyValue && belowHoldingLevel) {
        returnValue = (5 - tech.trim().length);
    } else if ((twoYearExpectedReturn < sellValue) || (anchorPricePresent && !priceAboveAnchor)) {
        returnValue = (-tech.trim().length);
    } else {
        returnValue = "HOLD";
    }
    return returnValue;
}

function allocAmount(stage, totalCost) {
    switch (stage) {
        case 1:
            return totalCost * 0.0075;
        case 2:
            return totalCost * 0.01;
        case 3:
            return totalCost * 0.015;
        case 4:
            return totalCost * 0.02;
        default:
            return 0;
    }
}

function holdingLevel(stage, stockBuyValue, totalCost) {
    const diff = stockBuyValue - allocAmount(stage, totalCost);
    if (diff >= 0.01) return "";
    return "UND";
}

function remainingAlloc(stage, stockBuyValue, totalCost) {
    return stockBuyValue - allocAmount(stage, totalCost);
}

// Don't copy this to app script
export {checkTech, valuation, doValuation, trendValuationAction2, holdingLevel, allocAmount};
