class Person {
    constructor(name) {
        this.name = name;
    }

     getName() {
         return this.name;
     }
}

const ryan = new Person('ryan');

function test(fn) {
    console.log(this);
    console.log(fn());
}

test.call(ryan, ryan.getName);
