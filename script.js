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
            [1,0],
            [1,0],
            [1,1],
        ],
        [
           
            [1,1,1],
            [1,0,0],
        ],
        [
            [1,1],
            [0,1],
            [0,1],
            
        ],
        [
            [0,0,1],
            [1,1,1],
         
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
          
           
        ],
        [
            [1,0],
            [1,1],
            [1,0]
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
       
    


    
}
function checkCollision(tetromino,x,y) {
    for (let i = 0; i<tetromino.length;i++ ){
        for(let j= 0; j < tetromino[i].length; j++) {
            const newX = j + x ;
            const newY = i + y ;
            return newX<0 || newX>cols || newY>=rows || newX&&newY==1;
        }
    }
  
    
}

let y = 0;
 function moveTetrominoDown() {
    y+=1;
    
    
    clearTetromino();
    if (checkCollision) {
        console.log("gotcha")
        // freezeTetromino();
        // checkCompleteRows();
        // resetTetromino()
        
    } else {

        
        placeTetromino(tetrominoes.L[1],x,y)
    }
    
 }
   
setInterval(moveTetrominoDown,2000

 