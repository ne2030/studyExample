function landPerimeter(arr) {
    let touchedLineCnt = 0;
    let landCnt = 0;
    arr.forEach((row, rowIdx) => {
      row.split('').forEach((cell, colIdx) => {
        if (cell === 'X') {
          landCnt++;
          touchedLineCnt += checkRightAndDown([rowIdx, colIdx], arr)
        }
      });
    });
    
    return `Total land perimeter: ${landCnt * 4 - 2 * touchedLineCnt}`;
  }
  
  function checkRightAndDown([x, y], arr) {
    return (arr[x][y+1] === 'X' ? 1 : 0) + 
    (arr[x+1] && arr[x+1][y] === 'X' ? 1 : 0)
  }

console.log(landPerimeter(["OXOOOX", "OXOXOO", "XXOOOX", "OXXXOO", "OOXOOX", "OXOOOO", "OOXOOX", "OOXOOO", "OXOOOO", "OXOOXX"]));
console.log(landPerimeter(["OXOOO", "OOXXX", "OXXOO", "XOOOO", "XOOOO", "XXXOO", "XOXOO", "OOOXO", "OXOOX", "XOOOO", "OOOXO"]));
console.log(landPerimeter(["XXXXXOOO", "OOXOOOOO", "OOOOOOXO", "XXXOOOXO", "OXOXXOOX"]));
console.log(landPerimeter(["XOOOXOO", "OXOOOOO", "XOXOXOO", "OXOXXOO", "OOOOOXX", "OOOXOXX", "XXXXOXO"]));
console.log(landPerimeter(["OOOOXO", "XOXOOX", "XXOXOX", "XOXOOO", "OOOOOO", "OOOXOO", "OOXXOO"]));