import {it, describe, expect} from "@jest/globals";
import {txDataImport, distributeOverMonths} from "./estimator.js";

describe('txDataImport', () => {
    it('should calc txDataImport', function () {
        console.log(txDataImport(1, 20000));
        console.log(txDataImport(2, 20000));
        console.log(txDataImport(5, 20000));
        console.log(txDataImport(10, 20000));
    });
});

describe('distributeOverMonths', () => {
    it('should calculate monthly distribution for a single date and amount', () => {
        const dates = ['2025-03-21'];
        const numbers = [1200];
        const monthlyValue = 1200 / 12; // 100 per month

        // Test for month within the 12-month period
        expect(distributeOverMonths(dates, numbers, 1)).toBe(0); // March
        expect(distributeOverMonths(dates, numbers, 3)).toBe(monthlyValue); // March
        expect(distributeOverMonths(dates, numbers, 4)).toBe(monthlyValue); // April
        expect(distributeOverMonths(dates, numbers, 13)).toBe(100); // February (before start date)
        expect(distributeOverMonths(dates, numbers, 13)).toBe(100); // February (before start date)
    });

    it('should handle multiple dates and amounts', () => {
        const dates = ['2025-03-21', '2025-04-15'];
        const numbers = [1200, 600];
        const firstMonthly = 1200 / 12; // 100 per month
        const secondMonthly = 600 / 12;  // 50 per month

        expect(distributeOverMonths(dates, numbers, 2)).toBe(0);
        expect(distributeOverMonths(dates, numbers, 4)).toBe(firstMonthly + secondMonthly);
        expect(distributeOverMonths(dates, numbers, 3)).toBe(firstMonthly);
    });
});
