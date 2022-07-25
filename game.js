// Queue used to keep track of the snake's tail
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

function drawBall( xCor, yCor, color ) {
    ctx.beginPath( );
    ctx.arc( xCor, yCor, ballRadius, 0, Math.PI*2 );
    ctx.fillStyle = color;
    ctx.fill( );
    ctx.closePath( );
}

function snakeLogic( ) {
    if ( snakeQ.length( ) >= 4 ) {
      // Dequeqing from the Queue ( Removing the snake's tail )
      let tempList = snakeQ.dequeue( );
      // Removing the food ball from the canvas
      ctx.clearRect( tempList[ 0 ] - ballRadius, tempList[ 1 ] - ballRadius, ballRadius * 2, ballRadius * 2 );
      // Erase ourselves from the map ( the tail ( 2 ) / no tail ( 0 ) )
      map[ tempList[ 0 ] ][ tempList[ 1 ] ] = 0;
    }

    // check game status
    if (!gameStatus()){
      ctx.clearRect( 0, 0, canvas.width, canvas.height );
      ctx.strokeText("You lost!", canvas.height/2, canvas.height/2);
      ctx.strokeText("Play again?", canvas.height/2 , canvas.height/2 + canvas.height/4);

      return;
    }

    // Check if the snake is intersecting the food
    if ( findIntersectionFood( ) ) {
      // If so create another random food spot
      findFood( );
      // Make the snake larger by enqueuing
      snakeQ.enqueue( [ x, y ] );
      // Draw the new piece of snake
      drawBall( foodX, foodY, '000000' );
      // Place the new snake on the map
      map[ x ][ y ] = 2;
    }

    //console.log(`map[${x}][${y}] = ${map[x][y]}`);
    console.log("coordinates:"+x+" "+y); //y = 320 is dead, x = 480

    drawBall( x, y, '0095DD' );

    snakeQ.enqueue( [ x, y ] );

    map[ x ][ y ] = 2;
    // put a function that adds to the right direction
    direction( );
}

function findFood( ) {
    // Choose random coordinates to place the food
    foodX = ( ( Math.floor( Math.random( ) * x ) * 10 ) % 460 ) + 10;
    foodY = ( ( Math.floor( Math.random( ) * y ) * 10 ) % 300 ) + 10;

    drawBall( foodX, foodY, '000000' );
    console.log( "foodX" + foodX + "foodY" + foodY );

    // Put food on the map
    map[ foodX ][ foodY ] = 1;
}

function findIntersectionFood( ) {
  // If the map in that position was originally 1 and we are going to convert it to a 2, then we have intersected
  if ( map[ foodX ][ foodY ] == 2 ) {
    return true;
  }
  return false;
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

function gameStatus() {
  // if anything here is true, user lost
  if ( map[x][y] === 2 || x <= 0 || x >= 480 || y <= 0 || y >= 320 ) {
    return false;
  }
  // user is still alive
  return true;
}

// main
let canvas = document.getElementById( "myCanvas" );
let ctx = canvas.getContext( "2d" );
ctx.font = "30px Arial";
let x = canvas.width/2;
let y = canvas.height/2;
let ballRadius = 5;
let dist = ballRadius * 2;
let rightBound = canvas.width - ballRadius;
let lowBound = canvas.height - ballRadius;
let snakeQ = new Queue( );
let direction = moveUp;
let foodX;
let foodY;

//let map = ( new Array( 480 ) ).fill( ( new Array( 320 ) ).fill( 0 ) );	// 2D array representing the map with 0's
let map = [];
for(let i = 0; i < 480;i++){
  map[i] = [];
  for(let j = 0; j < 320;j++){
    map[i][j] = 0;
  }
}

findFood( );

// listen to key's pressed
document.addEventListener( "keydown", changeDirection, false );

setInterval( snakeLogic, 225 );
