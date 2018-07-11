let obj = {
    name: 'ryan'
};

Object.defineProperty(obj, 'say', {
    get: function(){
        return 'hi my name is ' + this.name;
    },
    set: function(val) { this.name = val; }
});

console.log(obj.name);

console.log(obj.say);

obj.say = 'sophie';

console.log(obj.say);
