const _ = require('partial-js');

const match = (target) => {
    let fin = false;
    let result = null;
    const caseObj = {
        case: c => (...fns) => {
            if (!fin && ((_.isFunction(c) && c(target)) || (c === target))) {
                fin = true;
                result = _.pipe(...fns)(target);
            }

            return { ...caseObj };
        },
        else: fn => (fin ? result : fn(target))
    };
    return caseObj;
};

const f2 = a =>
  match (a)
    .case(1) (
      a => a + 10,
      a => a + 100,
      a => a + 1000)
    .case(2) (
      a => a + 20,
      a => a + 200,
      a => a + 2000)
    .case(a => a < 5) (
      _=> '1도 2도 아니지만 5보다는 작군요.')
    .else (
      _=> '1도 2도 아니군요.');

console.log( f2(1) );
// 1111
console.log( f2(2) );
// 2222
console.log( f2(4) );
// '1도 2도 아니지만 5보다는 작군요.'
console.log( f2(10) );
// '1도 2도 아니군요.'
