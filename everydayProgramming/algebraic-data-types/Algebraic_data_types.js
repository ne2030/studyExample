function zero() {}

function succ(nat) {
    return function () {
        return nat;
    };
}

function natToInt(nat) {
    return (function sol(n) {
        return n() ? 1 + sol(n()) : 0;
    }(nat));
}

// * TCO 지원이 안되서 쓰지 못함
// function intToNat(int) {
//     return int ? succ(intToNat(int - 1)) : zero;
// }


function intToNat(int) {
    function* _succ() {
        
    }
}

module.exports = {
    zero,
    succ,
    natToInt,
    intToNat,
};
