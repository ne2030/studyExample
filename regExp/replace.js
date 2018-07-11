const str = '무료공영노상스타트업 모두의      주차장 하이 ';

let res = str.replace(/(주차장)|(공영)|(민영)|(노외)|(노상)|(부설)|(주차허용구간)|(허용구간)|(\(\))/g, '');
res = res.replace('( )+', ' ');

console.log(res);
