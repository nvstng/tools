const intermediateMappings = [
    {
        "trend": "neg",
        "valuation": "under",
        "action": "HOLD"
    },
    {
        "trend": "neg",
        "valuation": "fair",
        "action": "%SELL"
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
        "action": "%SELL"
    },
    {
        "trend": "pos",
        "valuation": "under",
        "action": "BUY"
    },
    {
        "trend": "pos",
        "valuation": "fair",
        "action": "BUY"
    },
    {
        "trend": "pos",
        "valuation": "over",
        "action": "HOLD"
    }
];

const primaryMappings = [
    {
        "trend": "neg",
        "valuation": "under",
        "action": "%SELL"
    },
    {
        "trend": "neg",
        "valuation": "fair",
        "action": "SELL"
    },
    {
        "trend": "neg",
        "valuation": "over",
        "action": "SELL"
    },
    {
        "trend": "neu",
        "valuation": "under",
        "action": "HOLD"
    },
    {
        "trend": "neu",
        "valuation": "fair",
        "action": "HOLD"
    },
    {
        "trend": "neu",
        "valuation": "over",
        "action": "%SELL"
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

const underValued = {
    "lender": 0.29,
    "nonLender": 0.34
};

const fairlyValued = {
    "lender": 0.2,
    "nonLender": 0.23
}

function trendValuationAction(primaryTrend, valuation, isRecommended, holdingLevel) {
    const primaryMapping = primaryMappings.find((x) => x.trend === primaryTrend && valuation === x.valuation);
    let returnValue = "";

    if (primaryMapping && primaryMapping.action === "BUY") {
        returnValue = (isRecommended && holdingLevel === "UND") ? "BUY" : "HOLD";
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

function isRecommended(highPrice, price) {
    return price <= highPrice;
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
