'use strict';

const _ = require('immutable');

const Map = _.Map;


let first = Map({
    foo: Map({
        val: 10
    }),
    bar: Map({
        val: 20
    })
});

let second = first.setIn(['foo', 'val'], 500);
console.log(second === first); // false

console.log(second.get('foo') === first.get('foo')); // false

console.log(second.get('bar') === first.get('bar')); // true => 참조가 같다

// 바뀐 노드만 변경, 나머지는 재사용!

// 클로닝때 바꾸지 않은 값을 나중에 바꾸면 sharing 하는 객체는 값을 같이 바꿀까? 아니면 그때 새로 만들까

// => 애초에 immutable 이기 때문에 바뀌지 않는 것 같음, 그래서 참조가 같은 sharing 을 할 수 있는 듯
console.log(second.bar.val);
