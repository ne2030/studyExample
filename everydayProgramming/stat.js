const _ = require('partial-js');

const addAll = _.reduce((acc, cur) => acc + cur, 0);

const sortOrder = _.sortBy(_.identity);

const getMean = arr => _.pipe(
    addAll,
    v => v / arr.length
)(arr);

const getMedian =
    _.pipe(
        sortOrder,
        arr => (arr.length % 2 === 1 ? arr[Math.ceil(arr.length / 2) - 1] : getMean(arr.slice((arr.length / 2) - 1, (arr.length / 2) + 1)))
    );

const getMode = _.pipe(
    _.groupBy(_.identity),
    _.reduce((mode, cur) => (mode.length > cur.length ? mode : cur)),
    _.first
);

const getRange = arr => Math.max(...arr) - Math.min(...arr);

const getVariance = (arr) => {
    const m = getMean(arr);
    return _.go(arr,
        _.reduce((acc, cur) => acc + Math.pow((cur - m), 2), 0),
        v => v / (arr.length - 1)
    );
};

const getSD = arr => Math.pow(getVariance(arr), 1 / 2);

const getCV = (arr, v) => (v - getMean(arr)) / getSD(arr);

const getZs = (arr) => {
    const m = getMean(arr);
    const sd = getSD(arr);
    return _.map(arr, i => (i - m) / sd);
};

const getAll = arr => ({
    mean: getMean(arr),
    median: getMedian(arr),
    mode: getMode(arr),
    variance: getVariance(arr),
    sd: getSD(arr),
    zScores: getZs(arr)
});

const getCovariance = (arr) => {
    const [mean1, mean2] = _.go(arr,
        _.reduce(([t1, t2], [i1, i2]) => [t1 + i1, t2 + i2]),
        _.map(v => v / arr.length)
    );

    return _.go(arr,
        _.reduce((acc, [x, y]) => acc + ((x - mean1) * (y - mean2)), 0),
        v => v / (arr.length - 1)
    );
};

const getCC = (arr) => {
    const {
        x: a,
        y: b
    } = _.go(arr,
        _.flatten,
        _.groupBy((n, i) => (i % 2 ? 'y' : 'x'))
    );

    return getCovariance(arr) / (getSD(a) * getSD(b));
};

const arr1 = [7, 5, 6, 6, 6, 4, 8, 6, 9, 3];
const arr2 = [7, -5, -8, 7, 9];

const arrMix = [
    [80, 6],
    [100, 2],
    [100, 4],
    [110, 4],
    [130, 4],
    [190, 11],
    [200, 10]
];

_.hi(
    getCC(arrMix)
);
