window.addEventListener("load", (event) => {
  startGame();
});
const arrowDown = document.getElementById("onDown");
const arrowUp = document.getElementById("onUp");
const arrowLeft = document.getElementById("onLeft");
const arrowRight = document.getElementById("onRight");
const space = document.getElementById("onSpace");
const reset = document.getElementById("reset");
const paus = document.getElementById("paus");
const restart = document.getElementById("restart");
const highScore = document.querySelector("#highScore span");
const score = document.querySelector("#score span ");
const level = document.querySelector("#level span ");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rows = 20;
const cols = 10;
const cellSize = 25;

reset.addEventListener("click", resett);
arrowDown.addEventListener("click", () => {
  if (!isPaused) {
    console.log("down");
    moveDown();
  }
});
arrowUp.addEventListener("click", () => {
  if (!isPaused) {
    console.log("up");
    rotation();
  }
});
arrowLeft.addEventListener("click", () => {
  if (!isPaused) {
    console.log("left");
    moveLeft();
  }
});
arrowRight.addEventListener("click", () => {
  if (!isPaused) {
    console.log("right");
    moveRight();
  }
});
space.addEventListener("click", togel);

function rest() {
  window.location.reload();
}
//
restart.addEventListener("click", rest);

//establish main grid
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
if (localStorage.getItem("nilai") != null) {
  highScore.innerHTML = localStorage.getItem("nilai");
} else {
  highScore.innerHTML = 0;
}

function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] != 0) {
        ctx.fillStyle = "violet";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}
drawGrid();
const tetrominoes = {
  I: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],
  L: [
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
  ],
  T: [
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  ],
  square: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  skew: [
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  ],
};

let currentTetromino = tetrominoes.L[0];
function placeTetromino(tetromino, x, y) {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      if (tetromino[i][j] === 0) continue;

      const gridX = x + j;
      const gridY = y + i;

      if (gridY >= 0 && gridX >= 0 && gridX < cols && gridY < rows) {
        grid[gridY][gridX] = tetromino[i][j];
      }
    }
  }
  drawGrid();
}

function clearTetromino(tetromino, x, y) {
  //only CLEAR PREVIOUS TETROMINO no more

  if (y <= 0) {
    return;
  } else {
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] !== 0) {
          grid[y - 1 + i][x + j] = 0;
        }
      }
    }
  }
}
let tetrominoShape;

function checkCompleteRows() {
  for (let i = grid.length - 1; i >= 0; i--) {
    if (
      JSON.stringify(grid[i]) === JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    ) {
      grid.splice(i, 1);
      grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      i++;
      scoring += 10;
      console.log(scoring);

      score.innerHTML = scoring;
      if (scoring >= 200) {
        timeInterval = 100;
        level.innerHTML = 4;
      } else if (scoring >= 150) {
        timeInterval = 200;
        level.innerHTML = 3;
      } else if (scoring >= 100) {
        timeInterval = 500;
        level.innerHTML = 2;
      }
      clearInterval(gameInterval);
      gameInterval = null;
      startGame();
    } else {
    }
  }
}

function newTetromino() {
  const howManyTetrominoes = Object.keys(tetrominoes);
  const tetrominoKeys = Math.floor(Math.random() * howManyTetrominoes.length); //contain random value from 0 to how many tetrominos i have ....
  tetrominoShape = howManyTetrominoes[tetrominoKeys];
  const setTet = tetrominoes[tetrominoShape][0];
  currentTetromino = setTet;
}
function freezeTetromino(x, y) {
  placeTetromino(currentTetromino, x, y);

  console.log("freze function called");
  checkCompleteRows();
  newTetromino();
}
//this will make tetromino move right left and down
//the function work by implement moveTetrominoDown's function
function moveDown(params) {
  moveTetrominoDown();
}

function moveLeft(params) {
  clearTetromino(currentTetromino, x, y);
  if (checkCollision(currentTetromino, x - 1, y - 1) === true || y === 0) {
    return;
  } else if (checkCollision(currentTetromino, x - 1, y - 1) === false) {
    placeTetromino(currentTetromino, (x -= 1), y - 1);
    //cause the "y" is already added by 1 we need to substract y-1 : "
  }
}
function moveRight(params) {
  clearTetromino(currentTetromino, x, y);
  if (checkCollision(currentTetromino, x + 1, y - 1) == true || y == 0) {
  } else {
    placeTetromino(currentTetromino, (x += 1), y - 1);
  }
}

//work by transpose then reverse the tetromino
function rotation() {
  clearTetromino(currentTetromino, x, y);
  const cek = currentTetromino.length + x;

  if (cek > grid[0].length || y === 0) {
    return;
  } else {
    function rotateClockwise(matrix) {
      return matrix[0].map((_, colIndex) =>
        matrix.map((row) => row[colIndex]).reverse(),
      );
    }

    currentTetromino = rotateClockwise(currentTetromino);
    if (checkCollision(currentTetromino, x, y)) {
      return;
    } else {
      placeTetromino(currentTetromino, x, y - 1);
    }
  }
}
let timeInterval = 1000;

function pauseGame() {
  paus.style.display = "block";
  console.log("pause");
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
}
function startGame() {
  console.log("start");
  paus.style.display = "none";
  gameInterval = setInterval(moveTetrominoDown, timeInterval);
}

function togel(params) {
  isPaused = !isPaused;
  if (isPaused) {
    pauseGame();
  } else {
    startGame();
  }
}

document.addEventListener("keydown", (e) => {
  // console.log(e)
  if (e.key === "ArrowLeft" && isPaused === false) {
    moveLeft();
  } else if (e.key === "ArrowRight" && isPaused === false) {
    moveRight();
  } else if (e.key === "ArrowDown" && isPaused === false) {
    moveDown();
  } else if (e.key === "ArrowUp" && isPaused === false) {
    rotation();
  } else if (e.key === " ") {
    console.log("pause/start");
    togel();
  }
});

function checkCollision(tetromino, x, y) {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      if (tetromino[i][j] === 0) continue;

      const newX = j + x;
      const newY = i + y;

      if (
        newX < 0 ||
        newX >= cols ||
        newY === rows ||
        grid[newY]?.[newX] === 1
      ) {
        console.log("check collision true");

        return true;
      }
    }
  }
  return false;
}
function highScoreFunction() {
  const getNilai = JSON.parse(localStorage.getItem("nilai"));
  console.log(getNilai);
  if (localStorage.getItem("nilai") == null) {
    localStorage.setItem("nilai", scoring);
    highScore.innerHTML = scoring;
  } else {
    console.log(getNilai);
    if (scoring >= getNilai) {
      console.log(" hokya ini masuk highscore baru ");
      localStorage.setItem("nilai", scoring);
      highScore.innerHTML = scoring;
    } else {
      return;
    }
  }
}
//reset highscore
function resett() {
  localStorage.removeItem("nilai");
  highScore.innerHTML = 0;
}

let x = 3;
let y = 0;
let scoring = 0;

function moveTetrominoDown() {
  clearTetromino(currentTetromino, x, y);
  if (checkCollision(currentTetromino, x, y) === true && grid[0][3] == 1) {
    highScoreFunction();

    console.log("game over");
    pauseGame();
    paus.innerHTML = "GAME<br> OVER";

    //set highScore
  } else if (checkCollision(currentTetromino, x, y) === true) {
    freezeTetromino(x, y - 1);
    y = 0;
    x = 3;
  } else {
    placeTetromino(currentTetromino, x, y);
    y += 1;
    console.log("sudah di tambahkan y+1");
  }
}
function resetGame() {
  console.log("reset");
}

let gameInterval = null;
let isPaused = false;
