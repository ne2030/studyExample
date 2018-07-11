const should = require('should');

/**
 * http://www.codewars.com/kata/simplifying-multilinear-polynomials/train/javascript
 */

// util Func
const pipe = (...fns) => (arg) => {
    const r = fns.reduce((acc, fn) => (acc._stop ? acc : fn(acc)), arg);
    return r._stop ? r.val : r;
};

const groupBy = fn => (arr) => {
    const result = {};
    arr.forEach((a) => {
        const g = fn(a);
        result[g] = result[g] ? [...result[g], a] : [a];
    });
    return result;
};

const pairs = obj => Object.keys(obj).map(key => [key, obj[key]]);

const reduce = (fn, init) => xs => xs.reduce(fn, init);

const add = (a, b) => a + b;

const map = fn => xs => xs.map(fn);

const join = sep => xs => xs.join(sep);

const replace = (regex, to) => str => str.replace(regex, to);

const notEqual = (a, b) => a !== b;

const compare = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

const lexicalCompare = (str1, str2) => ([str1, str2].sort()[0] === str1 ? 1 : 2);

// Terms Functions
const Terms = {};
Terms.join = pipe(
  join('+'),
  replace(/\+-/g, '-'),
);

Terms.sort = xs => xs.sort((a, b) => {
    const [varA, varB] = [a[0], b[0]];

    if (notEqual(varA.length, varB.length)) return compare(varA.length, varB.length);
    return lexicalCompare(varA, varB);
});

Terms.filterZeroCof = xs => xs.filter(([v, cof]) => cof !== 0);

Terms.split = poly =>
    poly.replace(/-/g, '+-')
        .split('+')
        .filter(str => str !== '');

Terms.getVar = (term) => {
    const variable = term.match(/(-*\d*)*(\w+)/)[2];
    return variable.split('').sort().join('');
};

Terms.getCof = (term) => {
    const cof = term.match(/(-*\d*)*(\w+)/)[1];
    return !cof ? 1 :
        cof === '-' ? -1
        : +cof;
};

Terms.addCofs = terms => reduce((acc, term) => add(Terms.getCof(term), acc), 0)(terms);

Terms.create = ([v, cof]) => (cof === 0 ? '' : cof === 1 ? v : cof === -1 ? '-' + v : cof + v);

function simplify(poly) {
    return pipe(
    Terms.split,
        groupBy(Terms.getVar),
        pairs,
        map(([v, terms]) => [v, Terms.addCofs(terms)]),
        Terms.filterZeroCof,
        Terms.sort,
        map(Terms.create),
        Terms.join,
    )(poly);
}

should.equal(simplify('dc+dcba'), 'cd+abcd');
should.equal(simplify('2xy-yx'), 'xy');
should.equal(simplify('-a+5ab+3a-c-2a'), '-c+5ab');
console.log(
    simplify('3fk-kq+5kv-2qvy+fkqvy')
);
