var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
document.getElementById('canvasWidth').innerHTML  = canvas.width;
document.getElementById('canvasHeight').innerHTML = canvas.height;

// Игровое поле
var field = {
  state : [],
  // Размер поля
  sizeX : 100,
  sizeY : 100
};
document.getElementById('fieldWidth').innerHTML  = field.sizeX;
document.getElementById('fieldHeight').innerHTML = field.sizeY;

// Одна ячейка
var cell = {
  width  : Math.floor(canvas.width / field.sizeX),
  height : Math.floor(canvas.height / field.sizeY)
};
document.getElementById('cellWidth').innerHTML  = cell.width;
document.getElementById('cellHeight').innerHTML = cell.width;

var generations = 0;
var gameLoop;
var cellsCount = new cellsCount();
var mainButton = new mainButton();
var step = document.getElementById('step'); // Кнопка шага

canvas.onclick = function (event) {
  var x = Math.floor(event.offsetX / canvas.width  * field.sizeX);
  var y = Math.floor(event.offsetY / canvas.height * field.sizeY);
  if (field.state[x][y] == 0) {
    field.state[x][y] = 1;
    cellsCount.inc();
    render();
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < field.sizeX; x++) {
    for (var y = 0; y < field.sizeY; y++) {
      if (field.state[x][y] == 1)
        ctx.fillRect(x * cell.width, y * cell.height, cell.width, cell.height);
    }
  }
}

function makeStep() {
  var newWorld = [];
  for (var i = 0; i < field.sizeX; i++) {
    newWorld[i] = [];
    for (var j = 0; j < field.sizeY; j++) {
      // Подсчет соседей для текущей клетки
      var neighbors = 0;
      var cellsForCheck = [
        field.state[x(i-1)][j],
        field.state[i][y(j+1)],
        field.state[x(i+1)][j],
        field.state[i][y(j-1)],
        field.state[x(i-1)][y(j+1)],
        field.state[x(i+1)][y(j+1)],
        field.state[x(i+1)][y(j-1)],
        field.state[x(i-1)][y(j-1)]
      ];
      cellsForCheck.forEach(function (cell) { if (cell == 1) neighbors++; });

      if (field.state[i][j] == 0 && neighbors == 3) newWorld[i][j] = 1;
      else if (field.state[i][j] == 1 && (neighbors == 3 || neighbors == 2)) newWorld[i][j] = 1;
      else newWorld[i][j] = 0;
    }
  }
  field.state = newWorld;
  generations++;
  document.getElementById('count').innerHTML = generations;
  render();
}

// Ограничивает x в пределах поля
function x(x) {
  if (x < 0) return field.sizeX - 1;
  if (x >= field.sizeX) return 0;
  return x;
}

// Ограничивает y в пределах поля
function y(y) {
  if (y < 0) return field.sizeY - 1;
  if (y >= field.sizeY) return 0;
  return y;
}

function createField() {
  for (var x = 0; x < field.sizeX; x++) {
    field.state[x] = [];
    for (var y = 0; y < field.sizeY; y++) {
      field.state[x][y] = 0;
    }
  }
}

function cellsCount() {
  var value = 0;
  var element = document.getElementById('cellsCount');
  this.inc = function () { element.innerHTML = ++value; }
  this.dec = function () { element.innerHTML = --value; }
}

function mainButton() {
  const el = document.getElementById('mainButton');
  const loop = ["Start", "Stop"];
  var pointer = 0;
  const states = [
    {
      text : "Start",
      action : function () {
        gameLoop = setInterval(makeStep, 200);
        step.style.display = 'none';
        el.style.backgroundColor = '#e84118';
      }
    },
    {
      text : "Stop",
      action : function () {
        clearInterval(gameLoop);
        step.style.display = 'block';
        el.style.backgroundColor = '#4cd137';
      }
    }
  ];
  this.switch = function () {
    states[pointer].action();
    if (++pointer == states.length) pointer = 0;
    el.innerText = states[pointer].text;
  }
}

document.getElementById('mainButton').onclick = mainButton.switch;
step.onclick = makeStep;

createField();
