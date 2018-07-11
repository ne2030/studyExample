const fs = require('fs');

let file = fs.createWriteStream('test.txt');

console.log('start!');

/*
*
* 기본 작성 순서 알아보기
*/

file.write('hi');


for(let i = 0; i < 1000; i++) {
    let time = Math.random();
    setTimeout(function() {
        // file.cork();

        file.write(i);

        // file.write(' x: ' + i + '\n');

        console.log(i);

        // process.nextTick(() => file.uncork());

    }, 1000 * time);
}

//
// wirte 메써드가 micro task 인지 macro task 인지?
// answer: macro task
// -> 그렇다면, process.nextTick 으로 지연시키는게 의미가 있는지..?
// write i/o 작업 자체가 libuv 쪽으로 넘어가면서 먼저 처리되고,
// 콜백이 콜백큐에서 대기를 타고 있는데 nextTick 이 micro task 라서 먼저 실행되었을 뿐인건지,
// 아니면 혹시라도 청크 자체가 길어서 write 작업이 좀 걸리고, next tick 이 더 빨리 돌아서 uncork 가 write 되기 전에 먼저 쓰일수도 있는지..?
// -> 그것도 아니면 혹시 cork 하는 순간부터 메모리에 버퍼 된다고 했으니까 그냥 sync 처럼 처리가 되는건지..?? io 처리가 없으니까 충분히 그럴 수도 있겠다
//

// file.write('hey', () => console.log('wirte'));
// process.nextTick(() => console.log('tick'));
