const { Map, List } = require('immutable-ext');
const { Sum } = require('./monoid');

const res = List.of(1, 2, 3)
            .foldMap(Sum, Sum.empty());

console.log(res);

// fold -> "값을 밖으로 꺼낸다"
// array 의 fold => 값을 컬렉션 밖으로 꺼낼 것인데, 하나의 결과값으로 나와야 하므로 concat 을 해나가며 하나로 만듬
// foldMap 은 object 나 list 내부에서 monoid 가 아닌 값을 concat 하도록 만들기 위해 fold 전에 map 을 한번 거치는 것

