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
            [0,1],
            [1,1],
            [0,1]
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


//const indexNumberOnTetrominoShape =Math.floor(Math.random()*tetrominoes.length)
let currentTetromino = tetrominoes.L[0]
function placeTetromino(tetromino,x,y) {
    //x,y are coordinate number
    console.log(x,y)
    

   for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j]!=0){
        grid[y+i][x+j]=tetromino[i][j]}
        
    }
    
   }
    drawGrid()
   

    
 }
function clearTetromino(tetromino,x,y) {
//only CLEAR PREVIOUS TETROMINO no more
console.log("clear function called")

for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
        
        grid[y-1+i][x+j]=0;
        
        
    
    
   }
  //  drawGrid()
   
}
}
       
function newTetromino(){

    console.log("new tetromino called")
const howManyTetrominoes=Object.keys(tetrominoes)
const tetrominoKeys=Math.floor(Math.random()*howManyTetrominoes.length)  //contain random value from 0 to how many tetrominos i have ....
const tetrominoShape = howManyTetrominoes[tetrominoKeys]
const setTet = tetrominoes[tetrominoShape][0]
currentTetromino=setTet;

}
function freezeTetromino(x,y) {
    placeTetromino(currentTetromino,x,y)
  
    
console.log('freze function called');
 // checkCompleteRows();
 newTetromino();
    
}
//this will make tetromino move right left and down
//the function work by implement moveTetrominoDown's function 
function moveDown(params) {
    moveTetrominoDown()
}
    



function moveLeft(params) {
   
   
    
    clearTetromino(currentTetromino,x,y+1);
    if(checkCollision(currentTetromino,x-1,y)==true){
        
        
        
    }else{
        console.log("left")
        placeTetromino(currentTetromino,x-=1,y)
    }

    
    
}
function moveRight(params) {
    
    clearTetromino(currentTetromino,x,y+1);
    if(checkCollision(currentTetromino,x+1,y)==true){

    }else{
    
    console.log(" right")
    placeTetromino(currentTetromino,x+=1,y)
}
    
}
function rotation(params) {
    
    console.log ("rotate")
    
}
document.addEventListener("keydown",(e)=>{
    if (e.key === "ArrowLeft") {
        
        
        moveLeft()
        
    }
    else if (e.key === "ArrowRight") {

        moveRight()
        
    } 
    else if (e.key === "ArrowDown"){
        moveDown()
    }
    else if ( e.key === "ArrowUp"){
        clearTetromino(currentTetromino,x,y);

        rotation()    }


})

    

function checkCollision(tetromino,x,y) {
    for (let i = 0; i<tetromino.length;i++ ){
        for(let j= 0; j < tetromino[i].length; j++) {
            
            const newX = j + x ;
            const newY = i + y ;
           // console.log(newX)
           
           //console.log(newY)
            // const value= grid[newY][newX]
            // console.log(value)
            if(newX<0 || newX>=cols || newY==rows || grid[newY][newX]=== 1){
                console.log(true)
                return true
                

            }else{
            
            } 
        }
    }
  
    
}

let x= 3;
let y = 0;
 function moveTetrominoDown() {
   
    y+=1;
    
    clearTetromino(currentTetromino,x,y);
    if (checkCollision(currentTetromino,x,y)===true) {
       
    
       

        freezeTetromino(x,y-1);
        y=0;
        x=3;
        
       
        
    } else {
        

        
        placeTetromino(currentTetromino,x,y)
    }
    
 }
 
   
setInterval(moveTetrominoDown,1000);


