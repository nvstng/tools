// add a rule that avoids big losses from all-time high
// reduce holding when valuation reaches a certain point and low high is made
// reduce stage?
// set stage value based on valuation comfort and information availability

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
    if ((twoWeekChange >= 0.05 && tech === "a") || (twoWeekChange <= -0.05 && ["aaa", "aaa"].includes(tech))) return false;
    return true;
}

function doValuation(quarterDoneIn, currentQuarter = "Jun-24", resultsOut = true) {
    console.log("doValuation", quarterDoneIn, resultsOut);
    return resultsOut && quarterDoneIn !== currentQuarter;
}

const buyThreshold = 0.44;
const sellThreshold = 0.39;
const sellThresholdDespiteTech = 0.12;

function trendValuationAction2(symbol, tech = "", twoYearExpectedReturn, threeYearExpectedReturn, holdingLevel, price, anchorPrice, oneWeekChange = 0) {
    const belowIdealHoldingLevel = holdingLevel === 'UND';
    const alreadySelling = anchorPrice !== null && anchorPrice !== undefined && anchorPrice !== "" && anchorPrice !== 0;
    const priceAboveAnchor = (price * 1.02) >= anchorPrice;

    console.log(symbol, tech, holdingLevel, price, anchorPrice, belowIdealHoldingLevel, priceAboveAnchor);

    const techNegativity = tech.trim().length;
    const highTechNegativity = techNegativity > 1;
    const inBuyZone = (threeYearExpectedReturn >= buyThreshold);
    const inSellZone = twoYearExpectedReturn < sellThreshold;
    const partialSellZoneButAboveLastSell = alreadySelling && priceAboveAnchor;
    const partialSellModeAndFallenBelowAnchor = alreadySelling && !priceAboveAnchor;
    const veryOverValuedScore = (threeYearExpectedReturn <= sellThresholdDespiteTech && oneWeekChange < 0) ? -1 : 0;

    if (partialSellZoneButAboveLastSell) {
        return "HOLD";
    } else if (partialSellModeAndFallenBelowAnchor) {
        return -techNegativity + veryOverValuedScore;
    } else if (highTechNegativity && inSellZone) {
        return -techNegativity + veryOverValuedScore;
    } else if (highTechNegativity && !inSellZone) {
        return -techNegativity + 1 + veryOverValuedScore;
    } else if (inBuyZone && belowIdealHoldingLevel && !alreadySelling) {
        return (5 - techNegativity + veryOverValuedScore);
    } else if (inSellZone && !alreadySelling) {
        return -techNegativity + veryOverValuedScore;
    } else if (tech.length > 1 && inSellZone) {
        return -techNegativity + 1 + veryOverValuedScore;
    } else {
        return "HOLD";
    }
}

function allocAmount(stage, totalCost) {
    if (stage <= 1) {
        return (totalCost * stage * 0.015);
    } else if (stage <= 2) {
        return (totalCost * (stage / 2) * 0.02);
    } else if (stage <= 3) {
        return (totalCost * (stage / 3) * 0.03);
    } else if (stage <= 4) {
        return totalCost * 0.04;
    } else {
        return 0;
    }
}

function holdingLevel(stage, stockBuyValue, totalPortfolioCost, requiresInvestingInBlocks = false) {
    const diff = stockBuyValue - allocAmount(stage, totalPortfolioCost);
    if (requiresInvestingInBlocks && diff >= -0.6) return "";
    if (diff >= -0.01) return "";
    return "UND";
}

function remainingAlloc(stage, stockBuyValue, totalCost) {
    return stockBuyValue - allocAmount(stage, totalCost);
}

// Don't copy this to app script
export {checkTech, valuation, doValuation, trendValuationAction2, holdingLevel, allocAmount, buyThreshold, sellThreshold, sellThresholdDespiteTech};
