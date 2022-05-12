import { describe, expect, test } from 'vitest';

// source: https://leetcode.com/problems/merge-two-sorted-lists/

// Definition for singly-linked list. *Modified
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.valueOf = function() {
        return [this.val, ...this.next?.valueOf() || []]
    }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (left, right) {
    let list = new ListNode();
    let head = list;

    while (left && right) {
        if (left.val <= right.val) {
            list.next = new ListNode(left.val);
            left = left.next;
        } else {
            list.next = new ListNode(right.val);
            right = right.next;
        }
        list = list.next;
    }
    list.next ||= left || right;
    return head.next;
};

describe('mergeTwolists', () => {
    test('it merges two ListNodes', () => {
        const expected = [1,1,2,3,4,4];
        const left = new ListNode(1, new ListNode(2, new ListNode(4)));
        const right = new ListNode(1, new ListNode(3, new ListNode(4)));
        expect(mergeTwoLists(left, right).valueOf()).toEqual(expected);
    })
    test('it handles 0s', () => {
        const expected = [0,1,2,3,4,4];
        const left = new ListNode(1, new ListNode(2, new ListNode(4)));
        const right = new ListNode(0, new ListNode(3, new ListNode(4)));
        expect(mergeTwoLists(left, right).valueOf()).toEqual(expected);
    })
})