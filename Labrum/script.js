'use strict';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ball = document.getElementById("ball");
var nakov = document.getElementById("nakov");
var boiko = document.getElementById("boiko");
var krasiRadkov = document.getElementById("krasiradkov");
var rachkov = document.getElementById("rachkov");
var slavi = document.getElementById("slavi");
var zueka = document.getElementById("zueka");
var blast = document.getElementById("Blast");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var UpPressed = false;
var pPressed = false;
var brickColumnCount = 3;
var brickRowCount = 7;
var brickWidth = 50;
var brickHeight = 50;
var brickPadding = 23;
var brickOffsetTop = 40;
var brickOffsetLeft = 4;
var score = 0;
var lives = 3;
var level = 0;
var images = [boiko, krasiRadkov, nakov, rachkov, slavi, zueka];
var image = images[Math.floor(Math.random()*images.length)];

var bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        UpPressed = true;
    }
    else if (e.keyCode == 80){
        if(pPressed){
            pPressed = false;
            requestAnimationFrame(draw);
        }
        else{
            pPressed = true;
        }
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    blast.play();
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Win");
                        level++;
                        paddleWidth -= 5;
                        brickColumnCount++;
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.drawImage(ball, x, y, 20, 20);
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#DDD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.drawImage(image, brickX, brickY, 70, 70);
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Level: "+level, 88, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawLevel();
    collisionDetection();

        if(x + dx > canvas.width-2*ballRadius || x + dx < 0) {
            dx = -dx;
        }
        if(y + dy < 2*ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-3*ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        if (!pPressed) {
            requestAnimationFrame(draw);
        }
}

draw();