
const getKeyPrimeCnts = keys => n => {
    return keys.map(k => ({ key: k, count: getPrimeCnt(n, k).count }));
  };
  
  function zeroes (base, number) {
    const numbers = [];
    while (number) { numbers.push(number); number--; }
    
    const basePrimes = primeFactorization(base);
  
    const totalPrimes = numbers.map(getKeyPrimeCnts(Object.keys(basePrimes)))
      .reduce((acc, cur) => {
        cur.forEach(({ key, count }) => acc[key] ? acc[key] += count : acc[key] = count);
        return acc;
      }, {});
    
    const divides = Object.entries(basePrimes).map(([k, v]) => Math.floor(totalPrimes[k] / v));
  
    return Math.min(...divides);
  }
  
  function divideAll(arr, denominator) {
    let divideCnt = 0;
    const [finArr, restArr] = arr.map((a) => {
      if (a % denominator === 0) {
        divideCnt += 1;
        return a / denominator;
      }
      return a;
    }).reduce(([fin, rest], cur) => {
      cur % denominator === 0 ? rest.push(cur) : fin.push(cur);
      return [fin, rest];
    }, [[], []]);
  
    if (restArr.length) {
      const { r, c } = divideAll(restArr, denominator);
      return { r: [].concat(finArr, r), c: divideCnt + c };
    }
    return { r: finArr, c: divideCnt };
  }
  
  function primeFactorization(n) {
    let num = n;
    const primes = {};
    for (let idx = 2; num !== 1; idx++) {
      const { count, rest } = getPrimeCnt(num, idx);
      num = rest;
      if (count !== 0) primes[idx] = count;
    }
    
    return primes;
  }
  
  function getPrimeCnt(n, prime) {
    let cnt = 0;
    while(n % prime === 0) {
      cnt++;
      n /= prime;
    }
    return { count: cnt, rest: n };
  }
  
  console.time('start');
  
  console.log(
    zeroes(37, 1000000)
    // primeFactorization(99987900000000000000)
  );
  
  console.timeEnd('start');