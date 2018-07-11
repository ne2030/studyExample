// const p = new Proxy(target, handler);

// get, set 예제

{
    const handler = {
        get(target, prop) {
            if (prop === 'a') console.log('a is called!');
            return target[prop];
        },
        set(target, prop, value, receiver) {
            console.log(`${target + ''} set ${prop} to ${value + ''}`);
            target[prop] = value;
        },
    };

    const pencil = new Proxy({
        toString: () => 'Pencil [[Object]]',
        inspect: () => 'Pencil [[Object]]',
    }, handler);

    console.log(pencil);

    console.log(pencil.a);
    const b = pencil.a;
    pencil.a = 100;
    console.log(pencil.a);
}

// immer 예제 분석

{

}
