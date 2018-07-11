const _ = require('./_.js');
const assert = require('assert');

// 순수함수 ?
// 상태 변화를 만들지 않고, 항상 같은 인풋에 대해서 같은 아웃풋이 나오는 함수 -> side effect 가 없고, 동작을 예측하기 쉬움

// 일급함수 ?
// 함수를 인자로 받아서 새로운 함수를 리턴할 수 있는 것

// 함수형
// 순수함수들의 조합으로 나타내가는 것

/* add_maker */
function add_maker(a) {
    return function (b) {
        return a + b;
    };
}

const add10 = add_maker(10);

console.log(add10(20));

// 고차함수 - 함수를 인자로 받거나, 함수를 리턴하거나, 함수를 인자로 받아서 원하는 시점에 평가하는 것
// ex) _map, _filter

function _filter(arr, predi) {
    const new_list = [];
    for (let i = 0; i < arr.length; i += 1) {
        if (predi(arr[i])) {
            new_list.push(arr[i]);
        }
    }
    return new_list;
}
assert.deepStrictEqual(_filter([1, 2, 3], a => a % 2 === 0), [2]);

// Array.map vs _map 의 차이?
// 전자는 객체의 메써드, _map 은 함수 ! 이다. 그래서 전자는 객체지향적이고 _map 은 함수형의 형태이다.
// Cat.move_right(); vs move_right(Cat); 이 둘의 차이라고 볼 수도 있을 듯
// 그리고 _map 의 장점으로 다형성이 언급 되었는데, map 은 Array 에서만 쓸 수 있지만, _map 은 Array-like 객체에도 쓸 수 있다.
// - 사실 개인적인 생각으로는 array-like 객체가 사용할 일이 그렇게 많은가? 싶기도 하고, 그것보다 함수형으로 썼을 때 발생하는 방향 문제
// ex) map(filter(sort(array))) 이런식으로 안쪽부터 평가하는 것 보다는, array.sort().filter().map() 이게 더 보기 쉽고 직관적인 것 같다...?

// 위의 질문은 연결해주는 함수로 풀어볼 수는 있을 듯...!
// --> 성공! chain 함수 구현

const result = _.pipe(
    _.reduce((a, c) => {
        if (a.indexOf(c) === -1) a.push(c);
        return a;
    }, []),
    _.filter(a => a < 100),
    _.sort((b, c) => b > c),
    _.map(d => `${d}cm`),
)([101, 6, 4, 8, 104, 8, 54, 3, 187, 9, 54, 103]);

console.log(result);

// _curry, _curryr
// 인자를 하나씩 넣어서 함수를 리턴하고 사용할 수 있는 함수
// ex)  

const user = {
    name: 'ryan',
    age: 23,
};

const add = _.curry((a, b) => {
    return a + b;
});

const add5 = add(5);
console.log(add5(10));

// get 함수
// 안전한 참조 가능
const get = _.curryr((obj, name) => {
    return !obj ? undefined : obj[name];
});

const getName = get('name');
getName(user);
