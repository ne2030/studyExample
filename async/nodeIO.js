const fs = require('fs');
// 기록할 문자열을 생성합니다.
let str = [];
for (let j = 0; j < 1000000; j++) {
    str += '0123456789';
}
// 파일을 쓸 핸들을 엽니다.
const writeopen = fs.createWriteStream('results2.txt', { flags: 'w' });
writeopen.on('open', (data) => {
    console.log('open:', data);
    console.time('write');

    setTimeout(() => {
        console.log('Start');
		// 루프를 돌면서 실제로 파일을 씁니다.
        for (let i = 0; i < 100; i++) {
            writeopen.write(str, () => {
                console.log('write fin');
            });
        }
        console.log('End');
    }, 0);


    setTimeout(() => {
		// 타이머에 의해 화면에 Test2 를 출력합니다.
        console.log('Test2');
        console.timeEnd('write');
    }, 10);


	// 화면에 Test1을 출력합니다.
    console.log('Test1');


    setTimeout(() => {
        writeopen.end(() => {
			// 파일을 닫습니다.
            console.log('File Close');
        });
    }, 10000);
});
