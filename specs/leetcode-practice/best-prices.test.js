import { describe, expect, test } from "vitest";
import prices from './prices.json';

// source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    let max = 0;
    let ans = 0;
    for (let i = prices.length - 1; i >= 0; i--) {
        ans = Math.max(ans,  max - prices[i]);
        if (prices[i] > max) {
            max = prices[i]
        }
    }
    return ans;
};

describe("best prices", () => {
    test("finds max profit", () => {
        const expected = 5;
        expect(maxProfit([7,1,5,3,6,4])).toBe(expected);
    });
    test("reports when no profit possible", () => {
        const expected = 0;
        expect(maxProfit([7,6,4,3,1])).toBe(expected);
    });
    test("huge numbers quickly", () => {
        const expected = 999;
        expect(maxProfit(prices)).toBe(expected)
    }, 2000)
});
