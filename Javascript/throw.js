/*
* throw 관련 테스트
*/

function throwTest() {
    const obj = {
        a: 10,
        b: 20,
        c: 30,
    };
    throw obj;
}

try {
    throwTest();
} catch (err) {
    console.log(err);
}
