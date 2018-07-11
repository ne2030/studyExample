function test(a = 10, b) {
    console.log(a);
    return a + b;
}

// error
// let blank = test(,10);

let _undefined = test(undefined, 10);

let _null = test(null, 10);

let string = test('', 10);

// console.log(blank, '\n');
console.log(_undefined, '\n');
console.log(_null, '\n');
console.log(string, '\n');


// 결론
// default parameter 는 undefined 에서만 작동한다.
