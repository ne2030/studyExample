const add = x => y => x + y;

const inc = add(1);

const modulo = dvr => dvd => dvd % dvr;

const isOdd = modulo(2);

const filter = pred => xs => xs.filter(predi);

const map = f => xs => xs.map(f);

const getAllOdds = filter(isOdd);

const replace = regex => repl => str =>
    str.replace(regex, repl);

const censor = replace(/[aeiou]/ig)('*');
const censorAll = map(censor);

const res = censorAll(['hello', 'world']);

console.log(res);

// 커링은 주로 마지막에 데이터가 온다
