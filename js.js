var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
var arr = [];

//клик
canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  console.log(x);
  console.log(y);
  x = Math.floor(x / 10); // 299 / 10 = 30
  y = Math.floor(y / 10); // 300 / 10 = 30
  arr[y][x] = 1;
  console.log(arr);
  drawCell();
}

function drawCell() {
  ctx.clearRect(0, 0, 300, 300);
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 30; j++) {
      if (arr[i][j] == 1) {
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}

function createLife() {
  var n = 30, m = 30;
  for (var i = 0; i < m; i++) {
    arr[i] = [];
    for (var j = 0; j < n; j++) {
      arr[i][j] = 0;
    }
  }
}

createLife();
