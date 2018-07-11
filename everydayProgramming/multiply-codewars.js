function multiply(a, b)
{
  var overflow = 0;
  var memorize = [];
  var result = [];
  
  var memorize = b.split('').map((t, idx) => multiply_one(a, t, idx));
  arrayLast(memorize).reduce((overflow, cur, idx) => {
    const sum = arraySum(flatten(memorize.map(m => m[idx]))) + overflow;
    
    if (sum >= 10) {
      var split_res = res.toString().split('');
      result.push(split_res[1]);
      overflow = split_res[0];
    } else {
      overflow = 0;
      result.push(sum);
    }
  });
  
  if (overflow) {
    result.push(overflow);
  }
  
  
  return result.reverse().join('');
}

function multiply_one(origin, target, idx) {
  let overflow = 0;
  const result = new Array(idx).fill(0);
  origin.split('').forEach(n => {
    const res = (+n) * (+target) + overflow;
    if (res >= 10) {
      var split_res = res.toString().split('');
      result.push(split_res[1]);
      overflow = split_res[0];
    } else {
      overflow = 0;
      result.push(res);
    }
  });
  
  if (overflow) {
    result.push(overflow);
  }
  
  return result;
}

function arrayLast(arr){ 
  const len = arr.length;
  return arr[len - 1]
}

function flatten(arr) {
  return arr.reduce((acc, cur) => acc.concat(cur), []);
}

function arraySum(arr) {
  return arr.reduce((acc, n) => acc + parseInt(n), 0);
}