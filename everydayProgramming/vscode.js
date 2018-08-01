const fs = require('fs');

// l1. (★★★☆☆)
// Visual Studio Code와 유사한 Editor+++라는 에디터가 있다.
// Visual Studio Code에서는 괄호를 입력하면 자동으로 닫는 괄호가 입력되는 것처럼 Editor+++도 자동으로 괄호를 닫는다.
// 그런데 Editor+++는 가끔 버그로 인해 닫는 괄호를 늦게 다는 경우가 있다.

// 여기에 Editor+++에서 작성한 텍스트가 있는데 이 텍스트를 Visual Studio Code로 복사하고자 하는데
// 이 때 괄호가 올바른지 아래와 같이 검증하고자 한다.

// 예를 들어 (), {()} {()()} 처럼 입력할 때 닫는 괄호가 올바르게 표시되며 이는 올바른 형태이다.
// 그러나 ([)()] 의 경우 모두 쌍은 맞으나 괄호가 올바를 위치에 있지 않으므로 이는 올바르지 않은 형태이다.

// 문제) Editor+++에서 작성한 괄호값을 가진 임의의 텍스트가 있을 때, Visual Studio Code에서 인식이 가능한지 파악하고, 가능하면 true, 불가능하면 false를 출력하라.
// function bracket(str)
// (1 <= str.length <= 100,000)

// * 괄호의 순서는 따지지 않는다. 즉, 일상에서는 [{()}] 이런 순으로 와야 하나 여기에서는 그런 순서는 무시한다. ({[]}) 이런 케이스도 허용한다.
// * 무조건 열린 괄호가 있는 경우에만 닫힌 괄호가 들어온다. 열리기 전에 닫힌 괄호가 들어오지 않는다.
// * 제한시간: 5ms

const pair = {
    '}': '{',
    ']': '[',
    ')': '('
};

const findBrackets = /[[({})\]]/g;

const last = arr => arr[arr.length - 1];

function bracket(str) {
    let flag = true;
    const brackets = str.match(findBrackets);
    const residual = brackets.reduce((acc, cur) => {
        if (pair[cur]) {
            if (last(acc) === pair[cur]) acc.pop();
            else flag = false;
        } else {
            acc.push(cur);
        }
        return acc;
    }, []);

    return !residual.length && flag;
}

const testStr = fs.readFileSync('./test.txt', 'utf8');
console.log(testStr.length);

console.time('a');
console.log(bracket(testStr));
console.timeEnd('a');
