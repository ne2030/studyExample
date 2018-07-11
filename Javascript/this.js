let obj = {};

obj.test = function() {
    console.log('hi');
};

obj.method = function() {
    this.test();
    console.log(this);
};

obj.method();
