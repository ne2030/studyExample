// wrapped value 라고 생각을 하면 될 것
// 주로 Functor 라는 data type 으로 랩핑을 하거나, list 도 펑터라고 볼 수 있음

const _ = require('partial-js');
const fl = require('fantasy-land')

/* 조건
 1. 타입 생성자 - 기초타입을 위한 모나드화된 타입을 생성하는 기능. 예를 들면 기초타입인 number 를 감싸기 위해 Maybe<number> 를 정의하는 것
 2. unit 함수 - 기초타입의 값을 감싸 모나드에 넣음, Maybe 모나드가 number 타입인 값 2를 감싸 Maybe<number> 의 값 Maybe(2) 가 됨
 3. bind 함수 - 모나드 값으로 동작을 연결하는 함수

// 규칙
 1. bind(unit(x), f) === f(x);
 2. bind(m, unit) === m;
 3. bind(bind(m, f), g) === bind(m, x => bind(f(x), g)); // 결합법칙
*/ 

// Identity 모나드

function Identity(value) {
    this.value = value;
}

Identity.prototype.bind = function(transform) {
    return transform(this.value);
}

Identity.prototype.toString = function() {
    return `Identity(${this.value})`;
}

const identityResult = new Identity(5).bind(value =>
    new Identity(6).bind(value2 => new Identity(value + value2))
);
