var assert = require('assert');
var moment = require('moment');


let [a,b,c,d] = [{
        start: moment('09:00', 'HH:mm').format('HH:mm'),
        end: moment('18:00', 'HH:mm').format('HH:mm')
    },
    {
        start: moment('06:00', 'HH:mm').format('HH:mm'),
        end: moment('08:00', 'HH:mm').format('HH:mm')
    },
    {
        start: moment('19:00', 'HH:mm').format('HH:mm'),
        end: moment('22:00', 'HH:mm').format('HH:mm')
    },
    {
        start: moment('18:00', 'HH:mm').format('HH:mm'),
        end: moment('09:00', 'HH:mm').format('HH:mm')
    }
];

function compareTime(a,b){
    if(a.start >= a.end || b.start >= b.end) {
        return a.start >= b.end && a.end <= b.start;
    } else {
        return a.start <= b.start == a.end <= b.end;
    }
}

assert(compareTime(a,b));
assert(compareTime(a,c));
assert(compareTime(a,d));
assert(compareTime(b,c));
assert.equal(compareTime(c,d), false);
assert.equal(compareTime(b,d), false);
