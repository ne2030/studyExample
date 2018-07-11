const _ = require('partial-js');
const { typeCheck, curry } = require('./fn_group');

/*
* deep object 에 대한 value assign
* keys 를 배열로 받아서 깊은 객체에 값 할당을 할 수 있음
*/

const assignValue = exports.assignValue = (keys, value) => (obj) => {
    const [firstKey, ...rest] = typeCheck(keys, 'array') ? keys : [keys];
    const object = { ...obj };
    if (object[firstKey] && !typeCheck(object[firstKey], 'object') && !_.isEmpty(rest)) {
        throw new Error(`할당하려는 객체의 키에 이미 객체가 아닌 값이 존재합니다 : ${object[firstKey]} : ${typeof object[firstKey]}`);
    }

    object[firstKey] = _.isEmpty(rest) ? value : assignValue(rest, value)(object[firstKey] || {});

    return object;
};

/*
*
* deep object 에 대한 pick
* _.pick 에 대한 변형
*/

const pickPattern = [
    'a', 'b', 'c', { n: 'd', p: ['e', 'f', 'g', { n: 'h', p: ['i', 'j', 'k'] }] }
];

const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: {
        e: 4,
        f: 5,
        g: 6,
        h: {
            i: 7,
            j: 8,
            k: 9
        },
        i: 222,
        j: {
            k: 333
        }
    },
    e: 100,
    f: 110,
    g: 120,
    h: {
        i: 1000,
        j: 2000
    }
};

const pickDeepObj = curry((pattern, obj) => {
    const [strPattern, deepPattern] = _.partition(pattern, _.isString);
    return _.isEmpty(deepPattern) ?
        _.pick(obj, strPattern)
    :
        {
            ..._.pick(obj, strPattern),
            ..._.reduce(deepPattern, (acc, { n, p }) => assignValue(n, pickDeepObj(p, obj[n]))(acc), {})
        }
});

_.hi(
    pickDeepObj(pickPattern)(obj)
);
