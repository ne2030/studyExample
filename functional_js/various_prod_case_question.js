const _ = require('partial-js');
const log = (a) => { console.log(a); return a; };

/*
* 여러 함수를 실행할때 체이닝의 범위? 의미?
*/


/*
* 여러 함수를 실행할때, 각 함수들을 결과를 어떻게 관리하고, 어떻게 이전 결과를 사용할지?
*
*/

// function createPark(data) {
//     _.pipe(
//         addInfo,
//         deleteInfo,
//         createMail,
//         createPark,
//         check,
//
//     )
// }

(param) => {
    const setDefaultParam = param => ({ ...param, cropSize: { width: 10, height: 20 }, role: 'user' });

    const getImg = _.pipe(
        _.pick('url'),
        addHeader,
        (option) => axios.get(option)
    );

    const cropImg = param => _.pipe(
        _.partial(util.cropWidth, _, param.cropSize),
        _.partial(util.cropHeight, _, param.cropSize)
    )(params);
    
    const addWaterMark = _.pipe(
        getImgSize,
        selectWaterMark
    )

    return _.go(param,
        getImg,
        cropImg,
        addWaterMark
    );
}

// 체이닝의 기본은 결과물을 가공시켜 나가는 것 -> 누적이 아님

// 하지만 함수들이 개별적인 동작이고, 이를 전부 모아서 돌려주는 함수라면?
// 개별적인 동작들은 그냥 전부 변수에 할당해서 나중에 객체로 리턴을 해야 하는가?

// 그게 아니라면 체이닝에서 결과들을 누적시켜가는 방법은?

// <-- 인풋 파람 활용 방식 -->

// 인풋을 받아서 아웃풋을 주는게 함수라고 할 때, 함수 내부에서도 받은 인풋을 여러 곳에서 사용을 할 텐데, 이것도 상태라고 가정을 할 때
// 인풋이 중간에 변하지 않는다고 확신을 하지 못한다면 체이닝 혹은 명령형 조차도 인풋에 대한 접근이 안전해지지 않는 것 같다.
// 그렇다면 체이닝 내부에서는 외부의 영향을 받지 않는다고 했을 때, 함수들을 체인에 넣어서 내려가는 방식은 그나마 제일 안전하다고 생각하는 방법인데
// 문제는 함수 내부에서 인풋을 필요로 하는 곳이 시작 첫 부분만이 아니라면, 다른 곳에는 파람을 어떻게 전달해줘야 하는 것이다.

// 체이닝의 느낌에 제일 부합해 보이는 방식은 tuple 형식으로 멀티 리턴을 통해 체이닝을 유지하는 것인데, 이 방법은 실제 동작을 하는 함수에는 영향을 미치지 않아야 하고
// 이 함수를 감싸서 맨 처음 들어온 param을 두번째 리턴으로, 그리고 실제 리턴값은 첫번째 리턴으로 만들어서 넘겨주는 래퍼 함수가 필요하다.

// 이것도 그런데 1처럼 누적이 필요하게 되면 복잡해진다.

// 두번째는 클로져를 이용해서 파람을 함수에 선언시에 IIFE 방식으로 맵핑을 해두는 것이다. 하지만 이 방식은 인풋이 중간에 가공되지 않는다를 전제로 한 것이고
// 만약에 위 처럼 파람이 변경된다면 미리 맵핑을 할 수가 없다.

/*
*
* 에러 처리 방법? _.go 내부에서 에러 발생시, unhandled promise rejection 오류가 나타남
*
*/

/*
*
* _.map 과 커링과의 부조화? 커링시 여러가지에서 에러가 나타남
*
*/

const obj = { a: 10, b: 20, c: 30, d: 40 };

const arr = [{ ...obj }, { ...obj }, { ...obj }];
// console.log()
// _.omit('a')(obj)
// _.map(_.omit('a'))(arr);
// const result1 = _.map(_.omit('a'))(arr);

// _.go(arr,
//     _.map(_.omit('a')),
//     log
// );

// log(_.omit('a')({ a: 10, b: 20, c: 30 }));

// _.map(arr, function(a) {return a;});
// const testFunc = function(a) {return a;};

// testFunc._p_async = true;
// console.log(testFunc.apply);
// console.log(function())
// console.log(_.map(arr, testFunc));


// const result2 = _.map(_.pick(['a', 'b']))(arr);
// function multi(a, b, fn) {
//     fn(a, b);
// }
// _.partial(multi, ___, () => {});

const omitA = _.partial(_.omit, _, 'a');

class A {
    name;
}

findFromDB = function(a, func) {
    return {
        name: 'a',
        id: 1
    }
}

findA(a) {
    obj = findFromDB(function() {}, a);

}

const result3 = _.map(omitA);
const result4 = _.map(_.partial(_.pick, _, ['a', 'b']))(arr);

// console.log(result3, result4);
