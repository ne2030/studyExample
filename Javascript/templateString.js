function template(strings, ...keys) {
    return (function (...values) {
        console.log(keys[0]());
        console.log(strings, keys, values);
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}

const hi = () => 'hi';

const t1Closure = template`ADD ${hi}${1}${0}!`;
console.log(
    t1Closure('Y', 'A', { awef: '1222' })  // "YAY!"
);
// t1Closure('Y', 'A', { awef: 1222 });  // "YAY!"
// const t2Closure = template`${0} ${'foo'}!`;
// t2Closure('Hello', { foo: 'World' });  // "Hello World!"
