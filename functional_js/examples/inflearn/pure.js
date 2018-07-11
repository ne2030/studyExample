/**
 *
 * pure funcitons
 *
*/

const addMaker = a => b => a + b;
const add5 = addMaker(5);

const repeat = (fn, n, v) => {
    let result = v;
    for (let i = 0; i < n; i++) {
        result = fn(result);
    }
    return result;
};

const mul5 = x => repeat(add5, x, 0);

// console.log(
//     mul5(100)
// );

const mul = (a, b) => repeat(addMaker(a), b, 0);

// console.log(
//     mul(100, 3)
// );

const mulBy = a => b => mul(a, b);

const pow = (a, b) => repeat(mulBy(a), b, 1);

// console.log(
//     pow(5, 3)
// );

const set = function (key, val) {
    return function (obj) {
        return { ...obj, [key]: val };
    }
}
// const set = (key, val) => obj => ({ ...obj, [key]: val});

// -> 어느 부분이 동적으로 입력되냐에 따라서 인자 순서를 어떻게 할 것인지 결정됨
// 파이프라인 상에서 obj가 계속 누적되면서 결과를 만들어 나간다면 obj 를 나중에 받고
// val 가 누적되어서 내려오고 obj 

const age = { age: 24 };

const setRyan = set('name', 'ryan');
const ryan = setRyan(age);

console.log('age ::', age);
console.log('ryan ::', ryan);

/**
 *
 * impure funcitons
 *
*/


// 1) 외부에서 영향 받는 함수

{
    let a = 10;
    function mul(b) {
        return a * b;
    }

    mul(10); // 100

    a = 11;
    mul(10); // 110
    // -> 같은 인풋에 대한 리턴값이 달라진다 -> 평가 시점이 영향을 미친다
}

// 2) 외부에 영향을 주는 함수

{
    function changeA(b) {
        a = b + 100;
        return b;
    }

    changeA(10); // 10
    changeA(10); // 10

    // -> 결과값이 변하지는 않지만, 외부에 영향을 미친다. 즉, a 를 인풋값으로 전달하던 어떤 함수에 값이 예상치못하게 달라질 수 있다.
    // example

    {
        let a = 100;
        const b = 200;
        const add = (a, b) => a + b;
        add(a, b); // 300
        sideEffect(10);
        add(a, b); // 210

        /* 중간의 긴 로직들 ~~~~ */

        function sideEffect(x) {
            a = x;
            return x;
        }
    }

    // -> 겉으로 보기에 해당 스코프 내에서는 a 라는 변수를 직접적으로 바꾸는 것이 보이지 않아서 a 값이 변하지 않는다고 생각할 수 있으나
    // sideEffect 에서 a 를 바꾸기 때문에 리턴 값이 달라진다. 즉, 스코프 내에서 변수가 바뀌는 과정을 함수 내부로 들어가지 않고 확인할 수
    // 없다면 변수가 바뀌는 과정을 추적하기 어려워지고 복잡해진다.
}

// 3) 함수의 인자를 바꾸는 경우

{
    const add = (a, b) => {
        a = 10;

        return a + b;
    };

    // -> 흠... 왠만하면 불변값이 좋아서 그런거 같긴 한데, 딱히 사례는 못찾겠다.

    const addVal = (obj1, obj2) => {
        obj1.val++;
        obj2.val++;
        return obj1.val + obj2.val;
    };

    const obj1 = { val: 10 };
    const obj2 = { val: 20 };

    addVal(obj1, obj2); // 32
    // obj1 === { val: 11 }, obj2 === { val: 21 }
    // -> 인자로 들어오는 값이 객체일 경우, 인자로 받은 객체의 내부를 바꾸게 되면 참조로 이어진 외부의 객체도
    // 동일하게 변경이 적용되서 외부에 영향을 주게 된다.
    // 따라서 2번과 같은 부수효과를 일으키게 된다.
}
