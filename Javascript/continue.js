const assert = require('assert');
// for 문이 중복 되어있는 형태에서는 continue 가 어떻게 동작하는가?

const obj = {
    a: 10,
    b: 20,
    c: {
        d: 30,
        e: 40,
        f: {
            g: 50,
            h: 60
        }
    }
};



function test() {
    let results = [];
    for(let key in obj) {
        if(key === 'b') continue;
        results.push(key);
        if(key === 'c') {
            for(let key2 in obj[key]) {
                if(key2 === 'e') continue;
                results.push(key2);
            }
        }
    }
    return results;
}

// 객체 비교가 ... 잘 안되넹?
// 어쨌든 예상한대로, 가장 최근 for 문에다가 continue 적용
assert.equal(test(), ['a', 'c', 'd', 'f']);
