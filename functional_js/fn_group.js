const _ = require('partial-js');
const moment = require('moment');
const FP = require('./functional.es');

const fps = {};

/*
* promise wrapping
*/
const promiseWrapAll = a => Promise.all(a);
const isPromise = a => a instanceof Promise;

/*
* 커링 (단, 인자가 2개인 것만)
 */
fps.curry = f => (...args) =>
    args.length === 2 ? f(...args) : b => f(args[0], b);
fps.curryr = f => (...args) =>
    args.length === 2 ? f(...args) : b => f(b, args[0]);

/*
* try catch 랩핑
*/

fps.tryCatch = (fn, errorHandler) => (...args) => {
    try {
        const result = fn(...args);
        return !isPromise(result)
            ? result
            : result
                  .then(_.identity)
                  .catch(err => (errorHandler ? errorHandler(err) : err));
    } catch (err) {
        return errorHandler ? errorHandler(err) : err;
    }
};

/*
* 콘솔 후 리턴
*/
fps.log = (target) => {
    console.trace('\n\n:: LOG ::\n\n', target);
    return target;
};

/*
* Array 함수
*/
fps.wrapArr = v => [v];
fps.addArr = fps.curryr((xs, a) => [...xs, a]);

/*
* 비교 연산
*/
fps.gt = fps.curryr((a, b) => a > b);
fps.gte = fps.curryr((a, b) => a >= b);
fps.lt = fps.curryr((a, b) => a < b);
fps.lte = fps.curryr((a, b) => a <= b);

fps.isNotEqual = fps.curry((a, b) => _.go(a, _.isEqual(b), _.not));

/*
* 객체에서 값 가져오는 함수
*/

fps.getFromObj = fps.curry((obj, key) => obj[key]);
fps.getValueFromObj = fps.curryr((obj, key) => obj[key]);

/*
* 객체에 key의 array 만큼 뎁스로 들어가는 value 할당
* ex: const obj = {}; assignValue([a, b], 10); obj === { a: { b: 10 }}
*/

fps.assignValue = (keys, value) => (obj) => {   
    const [firstKey, ...rest] = fps.typeCheck(keys, 'array') ? keys : [keys];
    const object = { ...obj };
    if (
        object[firstKey] &&
        !fps.typeCheck(object[firstKey], 'object') &&
        !_.isEmpty(rest)
    ) {
        throw new Error(
            `할당하려는 객체의 키에 이미 객체가 아닌 값이 존재합니다 : ${
                object[firstKey]
            } : ${typeof object[firstKey]}`
        );
    }

    object[firstKey] = _.isEmpty(rest)
        ? value
        : fps.assignValue(rest, value)(object[firstKey] || {});

    return object;
};

fps.call = (fn, p) => fn(p);

/*
*
*   로직형 함수
*
*/

/*
* predicate 가 참인 결과를 리턴하면 func 실행, 아니면 alternative 함수 실행
* predi, func, alter 셋다 함수가 기본형이미잔 그냥 값으로 전달해도 가능
*/
fps.ifElse = (predi, func, alter) => (...params) => {
    const fn = flag =>
        flag
            ? _.isFunction(func)
                ? func(...params)
                : func
            : _.isFunction(alter)
                ? alter(...params)
                : alter;

    const flag = _.isFunction(predi) ? predi(...params) : predi;
    if (flag && flag instanceof Promise) {
        return flag.then(fn);
    }
    return fn(flag);
};

/*
* ifElse 의 반대 버전, 가독성을 위함
*/
fps.elseIf = (predi, alter, func) => fps.ifElse(predi, func, alter);

/*
* 주어진 함수들을 실행했을때 하나라도 참인 결과가 나오면 true
*/
fps.anyPass = fns => d =>
    _.go(fns, L.filter(_.partial(fps.call, _, d)), L.some);

/*
* 주어진 함수들을 실행했을때 전부 참인 결과가 나와야 true
*/
fps.allPass = fns => d => _.go(fns, _.map(_.partial(fps.call, _, d)), _.every);

/*
* partial-js pipe 관련 함수
* 파이프라인의 다음 함수로 여러 인자 전달
*/
fps.multiReturn = arr => _.mr(...arr);

/*
* A or B 함수화
* 커링되면 나중에 들어오는 인자가 A
*/
fps.or = fps.curryr((a, b) => a || b);

/*
* partial-js의 pipe 관련 함수
* predicate 가 truthy 한 값을 리턴하면 pipe 중단 및 returnFn 실행한 결과 리턴, 아니면 returnFn 무시하고 계속 진행
*/
fps.stopIf = (predi, returnFn) => (...params) =>
    fps.ifElse(
        predi,
        returnFn
            ? _.pipe(
                  returnFn,
                  v => _.stop(v)
              )
            : _.stop,
        _.identity
    )(...params);

/*
* partial-js의 pipe 관련 함수
* predicate 가 truthy 한 값을 리턴하면 returnFn 무시하고 계속 진행, 아니면 pipe 중단 및 returnFn 리턴값을 전체 pipe 에서 리턴
*/
fps.goIf = (predi, returnFn) => (...params) =>
    fps.ifElse(
        predi,
        _.identity,
        returnFn
            ? _.pipe(
                  returnFn,
                  v => _.stop(v)
              )
            : _.stop
    )(...params);

/*
* 같은 인자로 여러 함수 순차 실행 및 결과값들 Array 리턴
* Async 함수도 지원 및 여러 인자도 지원
*/
fps.multiFn = (...fns) => (...params) =>
    _.go(
        fns,
        _.map(fn => fn(...params)),
        fps.ifElse(
            _.some(r => r instanceof Promise),
            promiseWrapAll,
            _.identity
        ),
        _.catch(_.identity)
    );

/**
 * json 파싱
 * JSON 형식이 아니면 null 반환
 */
fps.parseJson = _.pipe(
    fps.tryCatch(JSON.parse),
    fps.ifElse(_.isError, _.constant(null), _.identity)
);

/*
* Array.includes 커링
*/
fps.arrIncludes = fps.curryr((arr, item) => _.contains(arr, item));

/*
* object의 key 변경
*/
fps.changeKey = function f(obj, prevKey, newKey) {
    // 인자 2개면 prevKey 와 newKey 로 partial application
    return arguments.length === 2
        ? _.partial(f, _, obj, prevKey)
        : (() => {
            const tmp = obj[prevKey];
            return _.go(obj, _.omit(prevKey), fps.assignValue(newKey, tmp));
        })();
};

/*
* 날짜 관련 함수
* a 가 b 이후 날짜면 true, 아니면 false
*/

fps.compareDate = (a, b) => {
    const momentA = moment.isMoment(a) ? a : moment(a);
    const momentB = moment.isMoment(b) ? b : moment(b);

    if (!momentA.isValid() || !momentB.isValid()) {
        throw new Error('invalid moment date');
    }

    return momentA.diff(momentB) > 0;
};

/*
* 숫자 관련 함수
*/

fps.isPositive = _.pipe(
    Math.sign,
    _.isEqual(1)
);

fps.nEqual = fps.curry((a, b) => a == b);

fps.isNil = v => v === undefined || v === null;

fps.isNilEmpty = v => fps.isNil(v) || _.isEmpty(v);

fps.omitObj = fps.curry((predi, obj) => {
    const omitFromObj = keys => _.omit(obj, keys);
    return _.isArray(predi)
        ? omitFromObj(predi)
        : _.isFunction(predi)
            ? _.go(
                  obj,
                  _.pairs,
                  _.filter(([k, v]) => predi(k, v)),
                  _.map(_.first),
                  omitFromObj
              )
            : new Error('인풋값이 array 나 function 이 아닙니다');
});

fps.omitEmptyKey = fps.omitObj((k, v) => fps.isNil(v));

fps.nToString = n => n + '';

/*
* 안전하게 deep property 값 가져오기
* 한번에 하나만 가져올 수 있다
*/

fps.get = fps.curryr((from, selector) =>
    selector
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur], from)
);

/*
* _.pick 의 깊은 버전
* 깊은 객체에서 원하는 형태의 객체로 뽑아낼 수 있다
* 실사례는 payment.service.js 참고
*/
fps.pickDeepObj = fps.curry((pattern, obj) => {
    const [strPattern, deepPattern] = _.partition(pattern, _.isString);
    return _.isEmpty(deepPattern)
        ? _.pick(obj, strPattern)
        : {
            ..._.pick(obj, strPattern),
            ..._.reduce(
                  deepPattern,
                  (acc, { n, p }) =>
                      fps.assignValue(n, fps.pickDeepObj(p, obj[n]))(acc),
                  {}
              )
        };
});

/*
* deep property 삭제하기
* pattern : ['a', 'b', 'c', 'd', 'e']
*/

fps.deepOmit = fps.curry((pattern, obj) => {
    const target = pattern.splice(pattern.length - 1, 1)[0];
    const omitObj = fps.get(obj, pattern.join('.'));
    return !_.isObject(omitObj)
        ? null
        : _.go(
              omitObj,
              o => _.omit(o, target),
              v => fps.assignValue(pattern, v)(obj)
          );
});

/*
*
* string 관련 함수
*
*/

fps.strSplit = fps.curryr((str = '', spliter = ',') =>
    FP.match(typeof str)
        .case('string')(() => str.split(spliter))
        .case('number')(() => [fps.nToString(str)])
        .else(() => [str])
);

fps.strIntersect = (str1, str2, spliter = ',') =>
    _.go(
        [str1, str2],
        _.filter(_.partial(fps.typeCheckAll, _, ['string', 'number'])),
        fps.stopIf(
            _.pipe(
                _.size,
                fps.lt(2)
            ),
            _.head
        ),
        _.map(fps.strSplit(spliter)),
        fps.multiReturn,
        _.intersection,
        arr => arr.join(spliter)
    );

fps.strJoin = seperator => (arr, ...str) =>
    _.isArray(arr) ? arr.join(seperator) : [arr, ...str].join(seperator);

/*
*
* 수학 관련 함수
*
*/

fps.divideBy = fps.curryr((numerator, denominator) => numerator / denominator);

/*
 * data 의 타입체크
 */
fps.typeCheck = (data, type) => {
    if (data === null || data === undefined) return false;
    switch (type) {
        case 'number':
            return typeof data === 'number'
                ? true
                : typeof data === 'string'
                    ? /^\d+(\.\d+)?$/.test(data.replace(',', ''))
                    : false;
        case 'coordinates':
            return /^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(data);
        case 'string':
            return typeof data === 'string';
        case 'time':
            return moment(data, 'HH:mm:ss').isValid();
        case 'phone':
            return /[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(data);
        case 'boolean':
            return data === 1 || data === '1';
        case 'array':
            return data instanceof Array;
        case 'object':
            return typeof data === 'object' && !(data instanceof Array);
        case 'floor':
            return typeof data === 'number' && data <= 6 && data > -10;
        default:
            console.log(data, type);
            throw new Error();
    }
};

fps.typeCheckAll = (data, types) =>
    _.some(_.map(types, _.partial(fps.typeCheck, data, _)));

fps.typeElse = (data, type) =>
    _.go(
        type,
        fps.ifElse(_.isArray, _.identity, fps.wrapArr),
        _.partial(fps.typeCheckAll, data, _),
        _.not
    );

module.exports = fps;
