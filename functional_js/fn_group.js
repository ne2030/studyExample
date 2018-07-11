const _ = require('partial-js');
const moment = require('moment');

/*
* promise wrapping
*/
const promiseWrapAll = a => Promise.all(a);

/*
* 커링 (단, 인자가 2개인 것만)
 */
const curry = exports.curry = f => function (a, b) { 
    return arguments.length === 2 ? f(a, b) : b => f(a, b);
};
const curryr = exports.curryr = f => function (a, b) {
    return arguments.length === 2 ? f(a, b) : b => f(b, a);
};

const isPromise = a => a instanceof Promise;

/*
* 콘솔 후 리턴
 */
exports.log = (target) => {
    console.trace('\n\n:: LOG ::\n\n', target);
    return target;
};

/*
 * data 의 타입체크
 */
const typeCheck = exports.typeCheck = (data, type) => {
    if (data === null || data === undefined) return false;
    switch (type) {
        case 'number':
            return typeof data === 'number' ? true : typeof data === 'string' ? /^\d+(\.\d+)?$/.test(data.replace(',', '')) : false;
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
            return (typeof data === 'object') && !(data instanceof Array);
        case 'floor':
            return typeof data === 'number' && data <= 6 && data > -10;
        default:
            console.log(data, type);
            throw new Error();
    }
};

/*
* if else 함수
 */
const ifElse = exports.ifElse = (predi, func, alter) => (...params) => {
    const fn = flag => (flag ?
        (_.isFunction(func) ? func(...params) : func)
        :
        (_.isFunction(alter) ? alter(...params) : alter)
    );

    const flag = _.isFunction(predi) ? predi(...params) : predi;
    if (flag && flag.constructor === Promise) {
        return flag.then(fn);
    }
    return fn(flag);
};

exports.elseIf = (predi, alter, func) => ifElse(predi, func, alter);


/*
* 객체에서 값 가져오는 함수
 */

const getFromObj = (obj, key) => obj[key];
exports.getValueFromObj = curry(getFromObj);

/*
* 함수 체이닝에서 조건에 따른 진행 여부 판별
 */
exports.stopIf = (predi, returnFn) => (...params) => ifElse(predi, returnFn ? _.pipe(returnFn, _.stop) : _.stop, _.identity)(...params);

exports.goIf = (...fns) => (...params) => ifElse(_.pipe(...fns), _.identity, _.stop)(...params);

exports.multiFn = (...fns) => (...params) =>
    _.go(fns,
        _.map(fn => fn(...params)),
        ifElse(_.some(r => r instanceof Promise), promiseWrapAll, _.identity)
    );


exports.strJoin = seperator => (arr, ...str) => (_.isArray(arr) ? arr.join(seperator) : [arr, ...str].join(seperator));

/*
* 객체에 값 할당
*/

const set = (key, value, obj) => {
    return value instanceof Promise ?
        value.then(v => set(key, v, obj))
        :
        { ...obj, [key]: value };
};

/*
* 객체에 key의 array 만큼 뎁스로 들어가는 value 할당
* ex:
 */

const assignValue = exports.assignValue = (keys, value) => (obj) => {
    const v = _.isFunction(value) ? value(obj) : value;
    const [firstKey, ...rest] = _.isArray(keys) ? keys : [keys];
    const object = { ...obj };
    if (object[firstKey] && !typeCheck(object[firstKey], 'object') && !_.isEmpty(rest)) {
        throw new Error(`할당하려는 객체의 키에 이미 객체가 아닌 값이 존재합니다 : ${object[firstKey]} : ${typeof object[firstKey]}`);
    }

    const result = _.isEmpty(rest) ?
        v instanceof Promise ?
            v.then(_.partial(set, firstKey, _, object))
            :
            set(firstKey, v, object)
        :
        set(firstKey, assignValue(rest, value)(object[firstKey] || {}), object);
    return result;
};

const call = (fn, p) => fn(p);

/*
* 로직형 함수
*/

exports.anyPass = fns => d =>
    _.go(fns,
        L.filter(_.partial(call, _, d)),
        L.some
    );

exports.allPass = fns => d =>
    _.go(fns,
        _.map(_.partial(call, _, d)),
        _.every
    );

/*
* json 파싱
*/

exports.parseJson = json => (json ? JSON.parse(json) : null);

exports.arrIncludes = curryr(_.contains);

exports.changeObjKey = function f(obj, prevKey, newKey) {
    return arguments.length === 2 ? _.partial(f, _, obj, prevKey) : (() => {
        const tmp = obj[prevKey];
        return _.go(obj,
            _.omit(prevKey),
            assignValue(newKey, tmp)
        );
    })();
};

/*
* try catch 랩핑
*/

exports.tryCatch = (fn, errorHandler) => (p) => {
    try {
        const result = fn(p);
        return !isPromise(result) ? result :
            Promise.resolve(
                result.then(_.identity)
                    .catch(err => (errorHandler ? errorHandler(err) : err))
            );
    } catch (err) {
        return errorHandler ? errorHandler(err) : err;
    }
};

/*
* 날짜 관련 함수
*/

exports.compareDate = (a, b) => {
    const momentA = moment.isMoment(a) ? a : moment(a);
    const momentB = moment.isMoment(b) ? b : moment(b);

    if (!momentA.isValid() || !momentB.isValid()) throw new Error('invalid moment date');

    return momentA.diff(momentB) > 0;
};

/*
* 숫자 관련 함수
*/

exports.isPositive = _.pipe(
    Math.sign,
    _.isEqual(1)
);

/*
* 객체 배열에서 중복값 지우기
*/

exports.uniqObjectArray = curryr((arr, predi) => {
    return _.reduce(arr, (acc, cur) => {
        const exists = _.find(acc, a => predi(a, cur));
        return exists ? acc : [...acc, cur];
    }, []);
});

/*
* 객체 배열 두개를 배교해서 차집합을 구함
*/

exports.difference = (objArr, removalObjArr, predi) =>
    _.reduce(objArr, (acc, cur) => {
        const exists = _.find(removalObjArr, _.pipe(
            _.map(r => predi(cur, r)),
            _.some
        ));

        return exists ? acc : [...acc, cur];
    }, []);

/*
* deep obj 에서 pick 쓰기
* pattern - ['a', 'b', 'c', { n: 'keyname', p: ['deepA', 'deepB', { n: 'keyname', p: ['deepDeepA']}]}]
*/

const pickDeepObj = exports.pickDeepObj = curry((pattern, obj) => {
    const [strPattern, deepPattern] = _.partition(pattern, _.isString);
    return _.isEmpty(deepPattern) ?
        _.pick(obj, strPattern)
        :
        {
            ..._.pick(obj, strPattern),
            ..._.reduce(deepPattern, (acc, { n, p }) => assignValue(n, pickDeepObj(p, obj[n]))(acc), {})
        };
});

/*
* 안전하게 deep property 값 가져오기
*/

const get = exports.get = curryr((from, selector) =>
    selector
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur], from)
);

/*
* deep property 삭제하기
*/

const deepOmit = exports.deepOmit = curryr((obj, pattern) => {
    const target = pattern.splice(pattern.length - 1, 1)[0];
    const omitObj = get(obj, pattern.join('.'));
    return !_.isObject(omitObj) ? null :
        _.go(omitObj,
            o => _.omit(o, target),
            v => assignValue(pattern, v)(obj)
        );
});

/*
* predi 로 원하는 값만 지우기
*/

exports.omitObj = curry((predi, obj) => {
    return _.isArray(predi) ? _.omit(obj, predi)
        :
        _.isFunction(predi) ? _.omit(obj, _.map(_.filter(_.pairs(obj), ([k, v]) => predi(k, v)), _.first))
        :
        new Error('인풋값이 array 나 function 이 아닙니다');
});

exports.undefinedOrNull = v => v === undefined || v === null;

/*
* 값 비교 함수
*/

const isNotEqual = exports.isNotEqual = curry((a, b) => {
    return _.go(a,
        _.isEqual(b),
        _.not
    );
});