// About Javascript's prototype && inheritance

// Javascript is a 'Object Linking Other Object' aka 'OLOO'

/*

// 1. 의사 클래스 방식 (Pseudo classical)
// * Javascript 에는 classical inheritance 가 없음, 그냥 객체를 다른 객체로 바로 상속시키는 방식
// 그런데 복잡하게 classical inheritance 처럼 보이는 구현 방식을 씀

// 1) 기본적인 '생성자 함수' 와 '객체 생성'
// 생성자 (constructor) 함수, this를 사용하여 프로퍼티들을 선언하며 메소드 같은 경우는 prototype에 붙임
function Test (score, name, major) {
  this.score = score;
  this.name = name;
  this.major = major;
}

// 처음 만들어진 생성자 함수는 기본적으로 모두 빈 객체 {} 를 prototype 으로 가짐
// 말 그대로 '원형'
Test.prototype.getScore = function() { console.log(this.score);};

let mathTest = new Test(80, 'ne2030'); // 3) 인스턴스 생성
console.log('mathTest: ' + mathTest); // 4) { score: 80, name: 'ne2030' } 메쏘드는 숨겨져 있음

for (let key in mathTest) {
  console.log('key: ' + key); // 5) 이때는 메쏘드도 찍힘
}

// 2) 새로운 생성자 함수 생성, Test 의 하위셋
function ComputerTest (score, name, rank) {
  this.name = name;
  this.score = score;
  this.rank = rank;
}

// ComputerTest 의 프로토타입을 Test 의 새로운 인스턴스로 변경
// prototype 을 다른 객체로 바꿈으로써 classical inheritance 느낌을 냄
// 그렇지만 결국에는 Object Linking
ComputerTest.prototype = new Test();

let firstTest = new ComputerTest(70, 'me', 'high');
let secondTest = new ComputerTest(55, 'me', 'middle');

console.log('firstTest: ' + firstTest);

for (let key in firstTest) {
  console.log(key + ': ' + firstTest[key]);
}

*/

/*
**
** 2. 기본적인 '생성자 함수'와 '객체 생성'
**
*/

// function Person() {
//     this.drink = true;
//     this.stemina = 100;
//     this.walk = function() {
//         this.stemina--;
//     };
//     this.run = function() {
//         this.stemina -= 2;
//     };
// }
//
// Person.prototype.fly = false;
//
// function Student() {
//     Person.call(this);
//     this.stemina = 200;
//     this.run = function() {
//         this.stemina -= 1;
//     };
// }
//
// Student.prototype = new Person();
// Student.prototype.constructor = Student;
//
// var a = new Student();
//
// console.log(a.drink);
// console.log(a.stemina);
// console.log(a.run);
// console.log(a.fly);


/*
**
** 3. Object.create 활용한 상속 구현
**
*/

function Person() {
    this.drink = true;
    this.stemina = 100;
    this.walk = function() {
        this.stemina--;
    };
    this.run = function() {
        this.stemina -= 2;
    };
}

Person.prototype.fly = false;

function Student() {
    // Person 의 this 에 묶인 프로퍼티들을 받기 위해서 실행
    // react 에서 this.props 를 사용하기 위해 constructor 에서 super() 메쏘드를 사용하는 것과 비슷한 방식
    Person.call(this);
    this.stemina = 200;
    this.run = function() {
        this.stemina -= 1;
    };
}

Student.prototype = Object.create(Person.prototype);

var a = new Student();

console.log(a.drink);
console.log(a.stemina);
console.log(a.run);
console.log(a.fly);
console.log(Student.prototype);
console.log(a.__proto__);
