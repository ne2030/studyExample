{
    const curry = fn => function f(...args) {
        return args.length < fn.length ? (...rest) => f(...args, ...rest) : fn(...args);
    };

    const add = curry((a, b, c) => [a, b, c]);

    // console.log(add(1, 2, 3));
    // console.log(add(1)(2, 3));
    // console.log(add(1)(2)(3));

    const curryr = fn => function f(...args) {
        return args.length < fn.length ? (...rest) => f(...rest, ...args) : fn(...args);
    };

    const addr = curryr((a, b, c) => [a, b, c]);

    // console.log(addr(1, 2, 3));
    // console.log(addr(1)(2, 3));
    // console.log(addr(1)(2)(3));
}

{
    /**
     * curry 함수 generator 버전
     * @param {*} fn 
     */
    const curry = fn => (...args) => {
        const gen = (function* () {
            while (fn.length > args.length) {
                const arg = yield ((...arg) => gen.next(arg).value);
                if (arg instanceof Array) args = args.concat(arg);
                else args.push(arg);
            }
            yield fn(...args);
        }());

        const possibleResult = gen.next().value;
        return args.length === fn.length ? possibleResult : (...arg) => gen.next(arg).value;
    };

    const add = curry((a, b, c) => [a, b, c]);

    // console.log(add(1)(2)(3));
    // console.log(add(1, 2, 3));
    // console.log(add(1)(2, 3));

    const curryr = fn => (...args) => {
        const gen = (function* () {
            while (fn.length > args.length) {
                const arg = yield ((...arg) => gen.next(arg).value);
                if (arg instanceof Array) args = [...arg, ...args];
                else args = [arg, ...args];
            }
            yield fn(...args);
        }());

        const callImmediate = args.length === fn.length;
        if (callImmediate) args = args.reverse();
        const possibleResult = gen.next().value;
        return callImmediate ? possibleResult : (...arg) => gen.next(arg).value;
    };

    const addr = curryr((a, b, c) => [a, b, c]);

    console.log(addr(1, 2, 3));
    console.log(addr(1)(2, 3));
    console.log(addr(1)(2)(3));
    console.log(addr(1, 2)(3));
}

{
    /**
     * 
     */
}