// function rotateClockwise(matrix) {
//   return matrix[0].map((_, colIndex) => 
//     matrix.map(row => row[colIndex]).reverse()
//   );
// }

// // Example
// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

// console.log(rotateClockwise(matrix));
// const larik = [[1,1,1,1],[0,0,0,0],[0,0,1,1],[1,1,1,1]];
// console.log(larik)
// const target = [5,5,5,5];
// const lorek = [2,2,2,2]

// const x = larik.findIndex(arr => 
//   arr.length === target.length && arr.every((val, index) => val === target[index])
// );

// console.log(x); // Output: 0
// larik.splice(0,1);
// larik.unshift(lorek)
// console.log(larik)


// larik.splice(7,1);
// console.log(larik)

const grid =[ [0,0,0,0,0],[1,1,1,1,],[0,0,0,0],[1,1,1,1]]

  
  
for (let i = grid.length-1;i>=0;i--){
  if (JSON.stringify(grid[i])===JSON.stringify([1,1,1,1])){
    grid.splice(i,1)
    console.log(i)

  }else{
    console.log(i,"nggak ke hapus")
  }
}
