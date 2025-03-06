import {expect, it} from "@jest/globals";
import {daysBetweenDates, expired, expiringInDays} from "./amc.js";

it('should calculate the number of days between two dates', () => {
    const date1 = '2023-01-01';
    const date2 = '2023-01-10';
    expect(daysBetweenDates(date1, date2)).toBe(9);
});

it('should calculate the number of days between two dates to be negative', () => {
    const date1 = '2023-01-01';
    const date2 = '2023-01-10';
    expect(daysBetweenDates(date2, date1)).toBe(-9);
});

it('should return 0 if the dates are the same', () => {
    const date1 = '2023-01-01';
    const date2 = '2023-01-01';
    expect(daysBetweenDates(date1, date2)).toBe(0);
});

it('should handle leap years correctly', () => {
    const date1 = '2020-02-28';
    const date2 = '2020-03-01';
    expect(daysBetweenDates(date1, date2)).toBe(2);
});

it('should return true if the date is expiring in the given number of days', () => {
    expect(expiringInDays('2025-01-01', 60, true)).toBe(true);
    expect(expiringInDays('2025-05-31', 60, true)).toBe(false);
    expect(expiringInDays('2025-02-01', 60, true)).toBe(true);
    expect(expiringInDays('', 60, true)).toBe(true);
});

it('should return false if the date is not expiring in the given number of days', () => {
    const date = '2030-01-01';
    const numberOfDays = 5;
    expect(expiringInDays(date, numberOfDays, true)).toBe(false);
});

it('should return true if the date is expired', () => {
    expect(expired('2020-01-01', true)).toBe(true);
    expect(expired('2025-01-01', true)).toBe(true);
    expect(expired('2030-01-01', true)).toBe(false);
});
