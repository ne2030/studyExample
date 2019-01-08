const createMbyNmatrix = (m, n, entry = 0) => {
    const arr = [];
    for (let i = 0; i < m; i += 1) {
        arr[i] = Array(n).fill(entry);
    }
    return arr;
};

const add = (a, b) => a + b;

function calculate(recs) {
    if (!recs.length) return 0;
    const range = recs.reduce(([xL, yL, xG, yG], [x1, y1, x2, y2]) => [Math.min(xL, x1), Math.min(yL, y1), Math.max(xG, x2), Math.max(yG, y2)]);
    const wholeMatrix = createMbyNmatrix(range[3] - range[1], range[2] - range[0]);
    recs.forEach(([x1, y1, x2, y2]) => {
        for (let i = y1; i < y2; i += 1) {
            for (let j = x1; j < x2; j += 1) {
                wholeMatrix[i - range[1]][j - range[0]] = 1;
            }
        }
    });
    return wholeMatrix.reduce((acc, row) => acc + row.reduce(add), 0);
}


const input = [[3, 3, 8, 5], [6, 3, 8, 9], [11, 6, 14, 12]];
const result = calculate(input);

console.log(
    result
);
