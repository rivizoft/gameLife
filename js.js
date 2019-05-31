var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');
var arr = [];

canvas.onclick = function (event) {
  var x = event.offsetX;
  var y = event.offsetY;
  console.log(x);
  console.log(y);
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
