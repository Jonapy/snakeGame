
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height - 30;
let ballRadius = 10;
let dist = 0.5;
let rightBound = canvas.width - ballRadius;
let lowBound = canvas.height - ballRadius;
let direction = moveUp;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    // put a function that adds to the right direction
    direction();
}

function moveRight(){
    x += dist; 
}

function moveLeft(){
    x -= dist;
}

function moveUp(){
    y -= dist;
}

function moveDown(){
    y += dist;
}

function changeDirection(e) {
    if(e.key == "ArrowRight" && x < rightBound) {
        // move right
        direction = moveRight; 
    }
    if(e.key == "ArrowLeft" && x > ballRadius ) {
        // move left
        direction = moveLeft;
    }
    if(e.key == "ArrowUp" && y > ballRadius) {
        // move up
        direction = moveUp;
    }
    if( e.key == "ArrowDown" && y < lowBound ) {
        // move down
        direction = moveDown;
    }
}

document.addEventListener("keydown", changeDirection, false);

setInterval(draw, 10);
/*
ctx.beginPath();
// draws a rectangle/square
// coordinate of top left corner
// then width and height

ctx.rect(20, 40, 50, 50);
// saves shape color
ctx.fillStyle = "#FF0000";

// fill up the shape with the color
ctx.fill();
ctx.closePath();

ctx.beginPath();
// coordinates of the center of the arc
// radius, initial and final angle, 
    ctx.arc(240, 160, 20, 0, Math.PI, false);
    ctx.fillStyle = "green";
    //ctx.fill();
    // fi you want to draw the external part of shape
    ctx.strokeStyle = "green"
    ctx.stroke();
ctx.closePath();
*/