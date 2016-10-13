'use strict';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ball = document.getElementById("ball");
let paddle = document.getElementById("paddle");
let win = document.getElementById("win");
let gameOver = document.getElementById("gameover");
let nakov = document.getElementById("nakov");
let alex = document.getElementById("alex");
let angel = document.getElementById("angel");
let ivan = document.getElementById("ivan");
let simeon = document.getElementById("simeon");
let trifon = document.getElementById("trifon");
let blast = document.getElementById("Blast");
let ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
let dx = 4;
let dy = 4;
let paddleHeight = 15;
let paddleWidth = 70;
var paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let pPressed = false;
let brickColumnCount = 3;
let brickRowCount = 7;
let brickWidth = 50;
let brickHeight = 50;
let brickPadding = 23;
let brickOffsetTop = 40;
let brickOffsetLeft = 4;
let score = 0;
let lives = 3;
let level = 1;
let images = [alex, angel, nakov, simeon, ivan, trifon];
let bricks = [];
let flag = false;

function fill() {
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { image : images[Math.floor(Math.random()*images.length)], x: 0, y: 0, status: 1 };
        }
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
        upPressed = true;
    }
    else if (e.keyCode == 80){
        if(pPressed){
            pPressed = false;
            console.log('p pressed');
            requestAnimationFrame(draw);
        }
        else{
            console.log("kbsbm");
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
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    blast.play();
                    score++;
                    if(score / level == 0){//brickRowCount*brickColumnCount*level){
                        level++;
                        dx+=0.2;
                        dy-=0.2;
                        flag = false;
                        draw();
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
    ctx.drawImage(paddle, paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.drawImage(bricks[c][r].image, brickX, brickY, 70, 70);
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
    if(flag == false) {
        fill();
    }
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
                if(lives == 0) {
                    ctx.drawImage(gameOver, canvas.width/4, canvas.height/2);
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    paddleX = (canvas.width-paddleWidth - 13)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth - 6) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 6) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;

        if (!pPressed && lives > 0) {
            flag = true;
            requestAnimationFrame(draw);
        }
}

draw();

