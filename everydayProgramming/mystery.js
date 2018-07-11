const R = require('ramda');

// const pipe = (...fns) => v => fns.reduce((acc, fn) => fn(acc), v);
// const go = (v, ...fns) => pipe(...fns)(v);
// const ifElse = (predi, t, f) => v => (predi(v) ? t(v) : f(v));
// const ltThan = a => b => a > b;

// function mystery(n) {
    
// }

// function getInfo(idx, bits) {
//     const half = (2 ** bits) / 2;
//     return [idx < half, half];
// }

// function getPrevIdx(idx, bits) {
//     const [isFront, half] = getInfo(idx, bits);

    
    
// }


// 조이님 코드
const getData = co.wrap(function* (pages, url, params) {
    let allSheetData = {};
    for (let i = 0; i < pages; i += 1) {
        const param = R.merge(params, { page: i, limit });
        const res = yield Request.get(url, { params: param });
        allSheetData = R.pipe(
            R.mergeDeepWithKey(
                (k, l, r) => { return k === 'data' ? R.concat(l, r) : r; },
                R.__, allSheetData),
        )(res);
    }
    return allSheetData;
});

// util 함수
const pipe = (...fns) => x => fns.reduce((acc, fns) => acc instanceof Promise ? acc.then(fns) : fns(acc), x);
const go = (v, ...fns) => pipe(...fns)(v);
const solveAsync = xs => Promise.all(xs);


// 함수 분리
const requestData = (limit, params, url) => R.pipe(
    page => ({ ...params, page, limit }),
    params => Request.get(url, { params })
);

// with 유틸 (비동기 파이프라인)
const getData = (pages, url, params, limit) => go(pages,
    R.partial(R.range, [0]),
    R.map(requestData(limit, params, url)),
    solveAsync,
    R.reduce((acc, sheet) => R.mergeDeepWithKey((k, l, r) => R.equals(k, 'data') ? R.concat(l, r) : r, sheet, acc), {}, R.__)
);

// without 유틸 (동기 파이프라인)
const getData = (pages, url, params, limit) => R.pipe(
    R.partial(R.range, [0]),
    R.map(requestData(limit, params, url)),
    solveAsync,
    req => req.then(R.reduce((acc, sheet) => R.mergeDeepWithKey((k, l, r) => R.equals(k, 'data') ? R.concat(l, r) : r, sheet, acc)), {}, R.__)
)(pages);