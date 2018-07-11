// const Either = Right || Left

const Right = x =>
({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`,
});

const Left = x =>
({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `LEFT(${x})`,
});

function eitherTest() {
    const result = Right(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
    const result1 = Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);

    console.log(result);
    console.log(result1);
}


const fromNullable = x => (x != null ? Right(x) : Left(null));

const findColor = name =>
    fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);

const result3 = findColor('green')
    .map(c => c.slice(1))
    .fold(e => 'no color',
        c => c.toUpperCase());

console.log(result3);

// either

/*

const parkinglotData = [
    {
        shareSeq: 123,
        parkinglotNum: '1-1-01',
        guSeq: 12,
        price: 300
    },
    {
        parkinglotSeq: 123,
        name: '트윈트리타워',
        ticketType: '현장처리',
        price: 600
    }
];

Right(parkinglotData)
    .map(d => d.)
a.isShared ? Left(a) : Right(a)

const isSharePark = d => !!d.shareSeq;

const sepParkType = (d) => {
    isSharePark(d) ? Left(d) : Right(d)
}

const getLeft = (a) => Left(a);

const getPhoto = id => `${id * 100}.png`;

const trimParkData = d =>
    d.map(p => { ...p, tax: p.price * 0.1 }) // 공통로직 - tax calculation
    .map(p => { ...p, photo: getPhoto(p.id)})
    .fold(getLeft, setParkType)
    .fold(addShareUser, addCompany)

const trimParkData_f = _.pipe(
    d => ({ ...d, tax: d.price * 0.1}),
    d => { ...d, photo: getPhoto(d.id)}),
    ifElse(isSharePark, addShareUser, addCompany)
)

중간에 타입이 바뀌려면...?
map 은 무조건 이전 타입으로 감싸니까 fold 를 해줘야 하고, 그러면 무조건 마지막에는 감싸줘야 하고
fold 를 할지 말지를 정하려면 뒤에 맵핑하려는 함수(사상)이 어떻게 리턴해줄지를 알아야 알 것, 그런데 에러는..?

*/

eitherTest();
