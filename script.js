const canvas = document.getElementById('canvas');
const ctx =  canvas.getContext('2d');
const rows = 20;
const cols = 10;
const cellSize = 20;
//establish main grid 
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));


function drawGrid() {
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(grid[i][j]!=0){
            ctx.fillStyle="orange"
           ctx.fillRect(j*cellSize,i*cellSize,cellSize,cellSize);
           ctx.strokeRect(j*cellSize,i*cellSize,cellSize,cellSize)
            }
            else
             
            {
                ctx.fillStyle="white"
                ctx.fillRect(j*cellSize,i*cellSize,cellSize,cellSize);
                ctx.strokeRect(j*cellSize,i*cellSize,cellSize,cellSize);
            }
        }
    }
}
drawGrid();
const tetrominoes = {
    I :[
        [
            [1],[1],[1],[1]
        ],
        [
            [1,1,1,1]
        ]
    ]
    // L: [
    //     //contain 4 shapes tetromino
    //     [],
    //     [],
    //     [],
    //     []
    // ]
}
function placeTetromino(tetromino,x,y) {
    //x,y are coordinate number

   for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
        grid[y+i][x+j]=tetromino[i][j]
        
    }
    
   }
   drawGrid()

    
 }

 placeTetromino(tetrominoes.I[1],3,0)  
 
