var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
var arr    = [];
var count  = 0;
var timer;

canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  x = Math.floor(x / 10); // 299 / 10 = 29.9 ~ 29
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

function startLife() {
  // моделирование жизни
  var arr2 = [];
  for (var i = 0; i < 30; i++) {
    arr2[i] = [];
    for (var j = 0; j < 30; j++) {
      var neighbors = 0;
      if (arr[fpm(i)-1][j] == 1) neighbors++; // up
      if (arr[i][fpp(j)+1] == 1) neighbors++; // right
      if (arr[fpp(i)+1][j] == 1) neighbors++; // bottom
      if (arr[i][fpm(j)-1] == 1) neighbors++; // left
      if (arr[fpm(i)-1][fpp(j)+1] == 1) neighbors++;
      if (arr[fpp(i)+1][fpp(j)+1] == 1) neighbors++;
      if (arr[fpp(i)+1][fpm(j)-1] == 1) neighbors++;
      if (arr[fpm(i)-1][fpm(j)-1] == 1) neighbors++;
      arr2[i][j] = (neighbors == 2 || neighbors == 3) ?  1 : 0;
    }
  }
  arr = arr2;
  drawCell();
  count++;
  document.getElementById('count').innerHTML = count;
  timer = setTimeout(startLife, 300);
}

function fpm(i) {
  return i == 0 ? 30 : i;
}

function fpp(i) {
  return i == 29 ? -1 : i;
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

document.getElementById('start').onclick = startLife;
