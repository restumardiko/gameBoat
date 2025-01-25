window.addEventListener("load",(event)=>{
    startGame()
})
const highScore = document.querySelector("#highScore span");
const score =  document.querySelector('#score span ')
const level = document.querySelector('#level span ')
const canvas = document.getElementById('canvas');
const ctx =  canvas.getContext('2d');
const rows = 20;
const cols = 10;
const cellSize = 20;
//establish main grid 
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
if (localStorage.getItem('nilai')!=null){

    highScore.innerHTML=localStorage.getItem('nilai')
}else{
    highScore.innerHTML=0
}





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
function placeTetromino(tetromino, x, y) {
    for (let i = 0; i < tetromino.length; i++) {
        for (let j = 0; j < tetromino[i].length; j++) {
            // Abaikan sel dengan nilai 0
            if (tetromino[i][j] === 0) continue;

            // Pastikan tetromino tidak menimpa nilai di grid yang sudah terisi
            const gridX = x + j;
            const gridY = y + i;

            if (gridY >= 0 && gridX >= 0 && gridX < cols && gridY < rows) {
                grid[gridY][gridX] = tetromino[i][j];
            }
        }
    }
    drawGrid(); 
}


function clearTetromino(tetromino,x,y) {
//only CLEAR PREVIOUS TETROMINO no more
// console.log("clear function called")
if (y==0 ){
    
    return
}else {



for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
        
        if(tetromino[i][j]!==0){
        grid[y-1+i][x+j]=0;
        }
      
        
    }  
    
    
   }
   // drawGrid()
   
}
}
let tetrominoShape;



//check complete
function checkCompleteRows(){
   
        
    for (let i = grid.length-1;i>=0;i--){
        if (JSON.stringify(grid[i])===JSON.stringify([1,1,1,1,1,1,1,1,1,1])){
            // console.log(i)
            grid.splice(i,1)
            grid.unshift([0,0,0,0,0,0,0,0,0,0])
            i++
            scoring+=10;
            console.log(scoring)
            score.innerHTML=scoring;

        }else {
            // console.log(i,"tidak dihapus")
            
        }
    }
    

   
}
       
function newTetromino(){

    // console.log("new tetromino called")
const howManyTetrominoes=Object.keys(tetrominoes)
const tetrominoKeys=Math.floor(Math.random()*howManyTetrominoes.length)  //contain random value from 0 to how many tetrominos i have ....
tetrominoShape = howManyTetrominoes[tetrominoKeys]
const setTet = tetrominoes[tetrominoShape][0]
currentTetromino = setTet;
// currentTetromino=tetrominoes.I[0]

}
function freezeTetromino(x,y) {
    placeTetromino(currentTetromino,x,y)
  
    
console.log('freze function called');
 checkCompleteRows();
 newTetromino();
    
}
//this will make tetromino move right left and down
//the function work by implement moveTetrominoDown's function 
function moveDown(params) {
    moveTetrominoDown()
}
    



function moveLeft(params) {
   
   
    
    clearTetromino(currentTetromino,x,y);
    if(checkCollision(currentTetromino,x-1,y)==true){
        
        
        
    }else{
        // console.log("left")
        placeTetromino(currentTetromino,x-=1,y-1)
        //cause the "y" is already added by 1 we need to substract y-1 : "
    }

    
    
}
function moveRight(params) {
    
    clearTetromino(currentTetromino,x,y);
    if(checkCollision(currentTetromino,x+1,y)==true){
        
    }else{
        
        // console.log(" right")
        placeTetromino(currentTetromino,x+=1,y-1)
    }
    
}

    //work by transpose then reverse the tetromino
function rotation() {
    const cek = currentTetromino.length+x;
    
    console.log(cek);

    if(cek > grid[0].length){
        return
    }else{



        clearTetromino(currentTetromino,x,y);
       // console.log(x,y)
        function rotateClockwise(matrix) {
            return matrix[0].map((_, colIndex) => 
              matrix.map(row => row[colIndex]).reverse()
            );
          }
    
        //    console.log(currentTetromino)
           currentTetromino= rotateClockwise(currentTetromino)
           if (checkCollision(currentTetromino,x,y)){
            return
           }else {

               placeTetromino(currentTetromino,x,y-1)
           }
         
    }
 
       
     
      }
//pauseGame
function pauseGame(){
    console.log("pause")
    if (gameInterval) {
        clearInterval(gameInterval); // Stops the interval
        gameInterval = null;
      }

}
function startGame() {
    console.log("start")
   gameInterval= setInterval(moveTetrominoDown,1000);
}
//togel function
function togel(params) {
    isPaused=!isPaused
    if(isPaused){
        pauseGame()
    }else{
        startGame()
    }
    
}
      
    
   

 
document.addEventListener("keydown",(e)=>{
    // console.log(e)
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
    else if ( e.key === ' '){
        console.log("pause/start")
        togel();

     
    }
  



})

    

function checkCollision(tetromino,x,y) {
    for (let i = 0; i<tetromino.length;i++ ){
      
        for(let j= 0; j < tetromino[i].length; j++) {
            if (tetromino[i][j] === 0) continue;

            
            const newX = j + x ;
            const newY = i + y ;
            
           //console.log(newY)
           
           //console.log(newY)
        //    console.log(grid[newY][newX])
           
            if(newX<0 || newX>=cols || newY=== rows ||  grid[newY]?.[newX] === 1 ){
                // console.log(true)
                // console.log(newX);
                // console.log(newY);
                
                return true
                

            }
          
       

            
            
            
        }
    }
    return false
}
function highScoreFunction() {
   const getNilai= JSON.parse(localStorage.getItem('nilai'))
   console.log(getNilai)
    if (localStorage.getItem('nilai')==null){
        localStorage.setItem('nilai',scoring)
        highScore.innerHTML=scoring
    }else {
        console.log(getNilai)
        if(scoring>=getNilai){
            console.log( " hokya ini masuk highscore baru ")
            localStorage.setItem('nilai',scoring)
            highScore.innerHTML=scoring
        }else {
            return
        }
    }

}

// if(scoring>=JSON.parse(localStorage.getItem('high score'))){
//     highScore.innerHTML=localStorage.getItem('high score')
//     localStorage.setItem("high score",scoring)
// }else{

// }


let x= 3;
let y = 0;
let scoring = 0;

 function moveTetrominoDown() {
    
    console.log(y)
   
    // y+=1;
    
    clearTetromino(currentTetromino,x,y);
     if ( checkCollision(currentTetromino,x,y)===true && grid[0][3]==1  ){
        highScoreFunction();

        

        
        
        console.log("game over")
        pauseGame()
        //set highScore 
        
        }
   else if (checkCollision(currentTetromino,x,y)===true) {
        
        
        
        
        
        freezeTetromino(x,y-1);
        y=0;
        x=3;
        
        
        
    }
    
    
  
     else {
        
        
        
        placeTetromino(currentTetromino,x,y)
        y+=1
    
    }
    
 }
 
 let gameInterval = null; 
let isPaused = false;
   






