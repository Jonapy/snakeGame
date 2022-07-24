document.addEventListener( "keydown", changeDirection, false );
setInterval( draw, 50 );

class Queue {
  constructor( ) {
    this.elements = { };
    this.head = 0;
    this.tail = 0;
  }
  enqueue( element ) {
    this.elements[ this.tail ] = element;
    this.tail++;
  }
  dequeue( ) {
    const item = this.elements[ this.head ];
    delete this.elements[ this.head ];
    this.head++;
    return item;
  }
  peek( ) {
    return this.elements[this.head];
  }
  length( ) {
    return this.tail - this.head;
  }
  isEmpty( ) {
    return this.length === 0;
  }
}

let canvas = document.getElementById( "myCanvas" );
let ctx = canvas.getContext( "2d") ;

let x = canvas.width/2;
let y = canvas.height/2;

let ballRadius = 10;
let dist = 1;

let rightBound = canvas.width - ballRadius;
let lowBound = canvas.height - ballRadius;

let direction = moveUp;

//let map = ( new Array( 480 ) ).fill( ( new Array( 320 ) ).fill( 0 ) );	// 2D array representing the map with 0's
let map = [];
for(let i = 0; i < 480;i++){
  map[i] = [];
  for(let j = 0; j < 320;j++){
    map[i][j] = 0;
  }
}

let snakeQ = new Queue( );

findFood( );

function drawBall( xCor, yCor, color ) {
    ctx.beginPath( );
    ctx.arc( xCor, yCor, ballRadius, 0, Math.PI*2 );
    ctx.fillStyle = color;
    ctx.fill( );
    ctx.closePath( );
}

function draw( ) {
     //Make same size as ball
    if ( snakeQ.length( ) >= 80 ) {
        let tempList = snakeQ.dequeue( );
        map[ tempList[ 0 ] ][ tempList[ 1 ] ] = 0;
        ctx.clearRect( tempList[ 0 ] - ballRadius - 1, tempList[ 1 ] - ballRadius - 1, ballRadius * 2 + 2, ballRadius * 2 + 2 );
    }

    snakeQ.enqueue( [ x, y ] );
    console.log(`map[${x}][${y}] = ${map[x][y]}`);
    map[ x ][ y ] = 2;
    drawBall( x, y, '0095DD' );
    // put a function that adds to the right direction
    direction( );
}

function findFood( ) {
    let foodX = Math.floor( Math.random( ) * x );
    let foodY = Math.floor( Math.random( ) * y );
    drawBall( foodX, foodY, '000000' );

    map[ foodX ][ foodY ] = 1;
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
        // check if we have touched the food ball
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
