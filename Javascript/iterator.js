var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

someArrayEntries.toString();           // "[object Array Iterator]"
someArrayEntries === someArrayEntries[Symbol.iterator]();    // true


// string as a iterator - built in iterable 객체

const someString = 'hi';

'function' == typeof someString[Symbol.iterator];

var iterator = someString[Symbol.iterator]();

iterator + ''; // "[object String Iterator]"

iterator.next();                             // { value: "h", done: false }
iterator.next();                             // { value: "i", done: false }
iterator.next();                             // { value: undefined, done: true }

// 사용자 설정 iterator

const someNewString = new String('hey'); // need to construct a String object explicitly to avoid auto-boxing

someNewString[Symbol.iterator] = function () {
    return {
        next() {
            if (this._first) {
                this._first = false;
                return { value: 'ho', done: false };
            }
            return { value: 'yo', done: true };
        },
        _first: true
    };
};

console.log(
    [...someNewString] // ['ho'], 마지막 value 값은 무시되는 것으로 보임
);

console.log(
    someNewString + ''
);

function makeIterator(array) { // iterator 이자 iterable 인 객체 만들어줌
    let nextIndex = 0;

    return {
        [Symbol.iterator]() { return this; },
        next() {
            return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { done: true };
        }
    };
}

// const newIterable = {
//     [Symbol.iterator]: makeIterator
// };

// console.log(
//     makeIterator([1, 2, 3, 4, 5])[Symbol.iterator]
// );

console.log(
    ...makeIterator([1, 2, 3, 4, 5])
);

function restArgsTest(...hi) {
    console.log(hi[Symbol.iterator]);
}

function argsTest() { // 최신환경에서는 arguments 같은 유사배열도 iterable 로 변경되었음
    console.log(arguments[Symbol.iterator]);
}

argsTest(1, 2, 3);

