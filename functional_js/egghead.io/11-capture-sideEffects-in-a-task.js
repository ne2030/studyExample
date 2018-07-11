const Task = require('data.task');

// lazyBox 와 either 의 결합

Task.of(1)
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('err', e),
    x => console.log('success', x));

// example - app 의 표현부와 실행부를 분리 가능 + 라이브러리와 그에 대해서 extend 를 통해 순수함 유지 가능
const launchMissiles = () =>
    new Task((rej, res) => {
        console.log('launch mmissiles');
        res('missiles');
    });

const app = launchMissiles().map(x => x + '!');

app.fork(e => console.log('err', e),
        x => console.log('success', x));
