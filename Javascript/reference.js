let obj = {
    app: {
        a: 10,
    },
    chat: {
        b: 20,
    },
};

function test() {
    return () => {
        console.log(obj.app.a);
        console.log(obj.app);
        console.log(obj.chat.b);
        return obj;
    };
}

var a = test()();

obj.chat = {
    c: 40
};

var b = test()();

console.log(a === b);
