function txDataImport(numberOfForms, multiplier) {
    return (multiplier) + ((numberOfForms - 1) * multiplier * 0.1);
}

/**
 * Distributes each number over the next 12 months starting from its corresponding date
 * @param {Array<string>} dates - Array of dates in ISO format
 * @param {Array<number>} numbers - Array of numbers to distribute
 * @param {number} [targetMonth] - Optional: Month number (1-12) to filter results for
 * @returns {Object} - Object with month-year keys and corresponding distributed values
 */
function distributeOverMonths(dates, numbers, targetMonthNumber) {
    let result = 0;

    dates.forEach((date, index) => {
        const startDate = new Date(date);
        const monthlyValue = numbers[index] / 12;
        const startMonthNumber = startDate.getMonth() + 1;
        if (targetMonthNumber >= startMonthNumber && targetMonthNumber < startMonthNumber + 12) {
            result += monthlyValue;
        }
    });

    return result;
}

export {txDataImport, distributeOverMonths};
