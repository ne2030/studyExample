const _ = require('partial-js');
const chalk = require('chalk');
const moment = require('moment');
const { omitObj, undefinedOrNull, assignValue, ifElse, isNotEqual, get, deepOmit } = require('./fn_group');

const log = console.log;

const testCompare = (w, r, e) => {
    const failTemplate = s => `Excpected: ${JSON.stringify(e)}, Result: ${JSON.stringify(s)}`;

    const compare = (a, b) =>
        (_.isObject(a) ? JSON.stringify(a) === JSON.stringify(b)
            :
        a === b);

    const result = r instanceof Promise ?
        r.then(v => ({ test: compare(v, e), data: v })) : { test: compare(r, e), data: r };

    _.go(result,
        ({ test, data }) => { test ? log(chalk.green(w, '\n success\n')) : log(chalk.red(w, '\n fail\n')); return { test, data }; },
        ifElse(_.pipe(_.val('test'), _.not), _.pipe(_.val('data'), failTemplate, _.hi), _.identity)
    );
};

const testWords = title => subtitle => `${title} test :: ${subtitle}`;

function omitObj_test() {
    const words = testWords('omitObj');

    const omitResult = omitObj((k, v) => undefinedOrNull(v), {
        a: 10,
        b: 20,
        c: undefined,
        d: 0,
        e: null
    });

    const expectedResult = {
        a: 10,
        b: 20,
        d: 0
    };

    testCompare(words('basic'), omitResult, expectedResult);
}

function assignValue_test() {
    const words = testWords('assignValue');

    const targetObj = {
        a: 1,
        b: {
            c: 3,
            d: {
                e: {
                    f: 100
                }
            }
        }
    };

    // 기본: 깊은 키에다가 값 할당 (기존 값 x)
    testCompare(words('basic'), assignValue(['b', 'd', 'e', 'g'], 10)(targetObj), { a: 1, b: { c: 3, d: { e: { f: 100, g: 10 } } } });

    // 기존에 값이 존재하는 깊은 키에다가 값 할당 (기존 값 o)
    testCompare(words('prev exists value'), assignValue(['b', 'd', 'e', 'f'], 10)(targetObj), { a: 1, b: { c: 3, d: { e: { f: 10 } } } });

    // 함수로 할당
    testCompare(words('assign function'), assignValue(['b', 'd', 'e', 'g'], () => 300)(targetObj), { a: 1, b: { c: 3, d: { e: { f: 100, g: 300 } } } });

    // 프로미스로 비동기 할당
    testCompare(words('assign async'), assignValue(['b', 'd', 'e', 'g'], async () => 300)(targetObj), { a: 1, b: { c: 3, d: { e: { f: 100, g: 300 } } } });
}

function isNotEqual_test() {
    const words = testWords('isNotEqual');

    const target = 1;

    testCompare(words('basic'), isNotEqual(target, 2), true);

    testCompare(words('currying'), isNotEqual(2)(target), true);
}

function get_test() {
    const words = testWords('get deep property');

    const deepObj = { a: { b: { c: 10 } } };

    testCompare(words('basic'), get(deepObj, 'a.b.c'), 10);

    testCompare(words('curry'), get('a.b.c')(deepObj), 10);

    testCompare(words('error'), get('a.d.c')(deepObj), undefined);
}

function deepOmit_test() {
    const words = testWords('omit deep property');

    const deepObj = { a: { b: { c: { d: { e: 100, f: 200 } } } } };

    testCompare(words('basic'), deepOmit(deepObj, ['a', 'b', 'c', 'd', 'e']), { a: { b: { c: { d: { f: 200 } } } } });

    testCompare(words('curry'), deepOmit(['a', 'b', 'c', 'd', 'e'])(deepObj), { a: { b: { c: { d: { f: 200 } } } } });
}

deepOmit_test();
