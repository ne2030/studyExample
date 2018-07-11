// 정수(int)가 주어지면, 팰린드롬(palindrome)인지 알아내시오. 팰린드롬이란, 앞에서부터 읽으나 뒤에서부터 읽으나 같은 단어를 말합니다. 단, 정수를 문자열로 바꾸면 안됩니다.
const assert = require('assert');
const _ = require('partial-js');

function isPalindrome(n) {
    const len = Math.floor(Math.log10(n)) + 1;
    const halfLen = Math.floor(len / 2);
    const isLenOdd = len % 2;

    const results = _.map(_.range(0, halfLen), (idx) => {
        const front = Math.floor(n / Math.pow(10, len - idx));
        const back = Math.floor(n / )
    }
}

assert.equal(isPalindrome(1), true);


1234321 /
