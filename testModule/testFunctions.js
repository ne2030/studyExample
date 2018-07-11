const should = require('should');
const _ = require('partial-js');

const tests = {};

tests.ok = (a) => {
    should.ok(a);
    return tests;
};

tests.isFalsy = (a) => {
    should.equal(!!a, false);
    return tests;
};

tests.exist = (...results) => {
    _.every(results, should.exist);
    return tests;
};

tests.notExist = (...results) => {
    _.every(results, should.not.exist);
    return tests;
};

tests.equal = (a, b) => {
    should.equal(a, b);
    return tests;
};

tests.notEqual = (a, b) => {
    should.notEqual(a, b);
    return tests;
};

tests.deepEqual = (a, b) => {
    should.deepEqual(a, b);
    return tests;
};

tests.isArray = (a) => {
    should(a).be.an.Array();
    return tests;
};

tests.isFunction = (a) => {
    should(a).be.an.Function();
    return tests;
};

tests.isObject = (a) => {
    should(a).be.an.Object();
    return tests;
};

tests.isString = (a) => {
    should(a).be.an.String();
    return tests;
};

tests.isNumber = (a) => {
    should(a).be.an.Number();
    return tests;
};

tests.containKeywords = (domains, keywords) => (row) => {
    _.each(_.zip(domains, keywords), ([domain, keyword]) => {
        should.exist(row[domain]);
        row[domain].should.containEql(keyword);
    });
    return tests;
};

tests.allHave = key => value => (AoO) => {
    _.each(AoO, obj => should.equal(obj[key], value));
    return tests;
};

module.exports = tests;
