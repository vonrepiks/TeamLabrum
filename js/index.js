var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var imageObject = new Image();

var imageObj = new Image();


function draw() {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
}
setInterval(draw, 10);
