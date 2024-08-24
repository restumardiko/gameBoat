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
            ctx.fillStyle="white"
            

           ctx.fillRect(j*cellSize,i*cellSize,cellSize,cellSize);
           ctx.strokeRect(j*cellSize,i*cellSize,cellSize,cellSize)
            
        }
        

    }
    
}
drawGrid();
