// const _async = func => (...params) => cb => {
//     let callback = _callback;
//
//
//
//
//     return function _async_cb_receiver() {
//         callback =
//     }
// }

// const wrap = function (fn) {
//
// }

const _async = func => (...params) =>
    function _async_cb_receiver(callback) {
        params[params.length] = callback;

        (function wait(args) {
            for (let i = 0; i < args.length; i += 1) {
                if (args[i] && args[i].name === '_async_cb_receiver') return args[i]((arg) => { args[i] = arg; wait(args); });
            }
            return func(...args);
        }(params));
    };

const add = _async((a, b, cb) => {
    setTimeout(() => {
        cb(a + b);
    }, 1000);
});

// add(20, 30)(result => console.log(result));

add(add(20, 30), add(30, 50))((a) => console.log(a));
