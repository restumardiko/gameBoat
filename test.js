function rotateClockwise(matrix) {
  return matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex]).reverse()
  );
}

// Example
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(rotateClockwise(matrix));