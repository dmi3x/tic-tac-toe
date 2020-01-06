export const allLines = (() => {
    function* range(start, end, step = 1) {
        for (let i = start; i <= end; i = i + step) yield i;
    }
    return [
        ...[0, 3, 6].map(i => [...range(i, i + 2)]),
        ...[0, 1, 2].map(i => [...range(i, 8, 3)]),
        [0, 4, 8],
        [2, 4, 6]
    ]
})();