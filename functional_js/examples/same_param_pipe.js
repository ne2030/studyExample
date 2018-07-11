

/* 
* 1. 동일한 parameter 를 이용해서 함수가 진행되어야 하는 경우
*
* 비즈니스 로직은 a -> b -> c 라는 큰 흐름이 있고, a의 실행에서 param 에 따른 세부 조작 변경, b와 c도 마찬가지 일 경우
* a 는 어차피 param 만 받으면 되지만, b 같은 경우는 a의 결과를 받아야 하고 그에 더해서 param 도 받아야 작업을 진행 가능
*/

// 해결책

// 1안
// - param 을 IIFE 로 함수에다가 맵핑

const param = { limit: 10, type: 'share' };

// a 의 리턴값은 파라미터를 포함하지 않거나 상관없는 값
const a = ({ limit, type }) => _.range(limit).map((a, i) => ({ name: `${type}parkinglot`, num: i }));

// b 는 param 의 내용에 따라 동작이 달라져야 함, 하지만 b 의 목적은 a 에서 받은 리스트를 필터하는 것
// 그렇다면 사실상 (리스트, 파람) 이런 식으로 여러개를 받아야 하는 게 맞긴 한데, 그렇게 되면 a 를 실행하는 것 뿐만 아니라
// 받아서 파람이랑 같이 튜플 형태로 넘기도록 일정한 작업을 체인 내에서 해줘야 하기 때문에 번잡

const b1 = (list, param) =>
    _.filter(list, 
        _.pipe(
            _.val('num'),
            n => n > (param.limit / 3)
        )
    )

// 더러움
_.go(param,
    (p) => _.mr(a(p), p),
    (l, p) => _.mr(b1(l, p), p),
    c
)

// 지저분
const b2 = ((cond) =>
        _.filter(
            _.pipe(
                _.val('num'),
                n => n > (cond.limit / 3)
            )
        ))
        (param);

// 지저분
const b3 = _.partial(
    (list, param) =>
        _.filter(list, 
            _.pipe(
                _.val('num'),
                n => n > (param.limit / 3)
            )
        ),
    _, param);


// 깔끔
_.go(param,
    a,
    b
)