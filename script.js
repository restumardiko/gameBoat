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
    ],
    L: [
    
        [
            [0,1,0],
            [0,1,0],
            [0,1,1],
        ],
        [
            [0,0,0],
            [1,1,1],
            [1,0,0],
        ],
        [
            [1,1,0],
            [0,1,0],
            [0,1,0],
            
        ],
        [
            [0,0,1],
            [1,1,1],
            [0,0,0],
        ]
    ],
    T:[
        [
            [1,1,1],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
           
        ],
        [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ]
    ],
    square:[
        [
            [1,1],
            [1,1]
        ]
    ],
    skew:[
        [
            [0,1,1],
            [1,1,0]
        ],
        [
            [1,0],
            [1,1],
            [0,1]
        ],
        [
            [0,1,1],
            [1,1,0]
        ],
        [
            [1,0],
            [1,1],
            [0,1]
        ]
    ]
}
function placeTetromino(tetromino,x,y) {
    //x,y are coordinate number

   for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j]!=0)
        grid[y+i][x+j]=tetromino[i][j]
        
    }
    
   }
    drawGrid()
   

    
 }
function clearTetromino() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            
            grid[i][j]=0
            
        }
        
       }
        drawGrid()
    


    
}
let y = 0;
 function moveTetrominoDown() {
    
    
    console.log(y+=1)
    clearTetromino();
    
    placeTetromino(tetrominoes.L[0],4,y)
 }
   
setInterval(moveTetrominoDown,2000)

 
