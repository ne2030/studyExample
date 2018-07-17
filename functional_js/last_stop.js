const _ = require('partial-js');

// 중간에서  _.stop 이 리턴될떄
_.go(
    10,
    _.pipe(
        _.hi,
        _.constant(_.stop(5)),
        _.hi
    ),
    _.hi
);

// 마지막에서 _.stop 이 리턴될때
_.go(
    10,
    _.pipe(
        _.hi,
        _.constant(_.stop(5))
    ),
    _.hi
);

// 마지막 리턴 값
// * 하이는 arguments 객체를 콘솔 찍으려고 할 경우 그냥 먹어버려서 콘솔이 찍히지 않는다.
_.hi(_.go(10, _.constant(_.stop(7))));

const result = _.go(10, _.constant(_.stop(7)));

console.log(result);

// 결론: 마지막에서 _.stop 이 리턴되면 해당 파이프 조작을 멈추는 것이 아니라 그냥 _.stop 자체를 그대로 리턴

_.go(10, _.tap(_.hi, _.constant(_.stop(1))), () => {
    console.log('last');
});
