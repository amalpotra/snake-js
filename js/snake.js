var canvas = document.getElementById('game');
var score = document.getElementById('score');
var context = canvas.getContext('2d');

var grid = 20;
var count = 0;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  // length of snake
  initCells: 1
};
// initial food location
var food = {
  x : getRandomInt(0, 25) * grid,
  y : getRandomInt(0, 25) * grid
};
// get random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
  requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  // keep track of where snake has been
  snake.cells.unshift(
    {
      x: snake.x,
      y: snake.y
    });
  // remove cells as we move away from them
  if (snake.cells.length > snake.initCells) {
    snake.cells.pop();
  }
  // draw food
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, grid-1, grid-1);
  // draw snake
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  
    // snake ate food
    if (cell.x === food.x && cell.y === food.y) {
      snake.initCells++;
      // set score, 10 per food
      score.innerHTML = "Score: " + snake.cells.length * 10;
      // get new food location
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }
    // check collision with all cells
    for (var i = index + 1; i < snake.cells.length; i++) {
      // if snake collides then reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.initCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        score.innerHTML = "Score: 0";
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}
document.addEventListener('keydown', function(e) {
  // check that it's not already moving on the same axis
  // left key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
//start game
requestAnimationFrame(loop);