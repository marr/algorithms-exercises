import { expect, test } from 'vitest';

function fib(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else if (n <= 0) {
        return 0;
    }
    return fib(n - 1) + fib(n - 2);
}

test("fibonacci", () => {
    const ans = 5;
    expect(fib(5)).toBe(ans);
    // expect(fib(49)).toBe(7778742049); // takes about 120s to run
})