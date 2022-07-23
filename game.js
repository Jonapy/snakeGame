function drawBall( xCor, yCor, color ) {
    ctx.beginPath( );
    ctx.arc( xCor, yCor, ballRadius, 0, Math.PI*2 );
    ctx.fillStyle = color;
    ctx.fill( );
    ctx.closePath( );
}

function draw( ) {
    // Make same size as ball
    //ctx.clearRect( 0, 0, canvas.width, canvas.height );  
    drawBall( x, y, '0095DD' );
    // put a function that adds to the right direction
    direction( );
}

function findFood( ) {
    let foodX = Math.floor( Math.random( ) * x );
    let foodY = Math.floor( Math.random( ) * y ); 
    drawBall( foodX, foodY, '000000' );
}

function moveRight( ) {
    x += dist; 
}

function moveLeft( ) {
    x -= dist;
}

function moveUp( ) {
    y -= dist;
}

function moveDown( ) {
    y += dist;
}

function changeDirection( e ) {
    if( e.key == "ArrowRight" && x < rightBound ) {
        // move right
        direction = moveRight; 
    }
    if( e.key == "ArrowLeft" && x > ballRadius ) {
        // move left
        direction = moveLeft;
    }
    if( e.key == "ArrowUp" && y > ballRadius ) {
        // move up 
        direction = moveUp;
    }
    if( e.key == "ArrowDown" && y < lowBound ) {
        // move down
        direction = moveDown;
    }
}

document.addEventListener( "keydown", changeDirection, false );
setInterval( draw, 10 );


let canvas = document.getElementById( "myCanvas" );
let ctx = canvas.getContext( "2d") ;

let x = canvas.width / 2;
let y = canvas.height - 30;

let ballRadius = 10;
let dist = 0.5;

let rightBound = canvas.width - ballRadius;
let lowBound = canvas.height - ballRadius;

let direction = moveUp;
findFood( );
