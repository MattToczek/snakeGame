const board = document.getElementById("gameCanvas");
const ctx = board.getContext('2d');
let foodX;
let foodY;
let foodCheck;

ctx.lineWidth = 2; 
ctx.strokeRect(0, 0, 300, 300);

let snake = [  
    {x: 150, y: 150},  
    {x: 140, y: 150},  
    {x: 130, y: 150},  
    {x: 120, y: 150},  
    {x: 110, y: 150},
];

function drawSnakePart(snakePart) {  
    ctx.fillStyle = 'lightgreen';  
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function clearCanvas() {  
    ctx.fillStyle = "white";  
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, board.height, board.width);
    ctx.strokeRect(0, 0, board.height, board.width);
    
}

function drawSnake() {
      snake.forEach(drawSnakePart);
}

advanceSnake = () => {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
    if (didEatFood) {    
        food();  
    } else {    
        snake.pop();  
    }}


advanceSnakeEat = () => {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
}

let dx=0;
let dy = -10;

advanceSnake()
drawSnake();


let main = () => {setTimeout(function onTick(){
    clearCanvas();
    drawFood();
    advanceSnake();
    check()
    drawSnake();
    main();
    }, 100)
};

function changeDirection(event) {  
    const LEFT_KEY = 37;  
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;  
    const goingUp = dy === -10;  
    const goingDown = dy === 10;  
    const goingRight = dx === 10;  
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) 
        {    dx = -10;    dy = 0;  }
    if (keyPressed === UP_KEY && !goingDown) 
        {    dx = 0;    dy = -10;  }
    if (keyPressed === RIGHT_KEY && !goingLeft) 
        {    dx = 10;    dy = 0;  }
    if (keyPressed === DOWN_KEY && !goingUp) 
            {    dx = 0;    dy = 10;  }
}

document.addEventListener("keydown", changeDirection)

let randomNum = (min, max) => {
    return Math.round((Math.random()*(max-min)+min)/10)*10;
}

let food = () => {
    foodX = randomNum(0, board.width - 10);
    foodY = randomNum(0, board.height - 10);
}

let check = () => {
    snake.forEach(
        foodCheck = (part) => {
            let eaten = part.x == foodX && part.y == foodY;
            if(eaten) {
                food();
            }
        }
    )
}

function drawFood() { 
    
    ctx.fillStyle = 'red'; 
    ctx.strokestyle = 'darkred'; 
    ctx.fillRect(foodX, foodY, 10, 10); 
    ctx.strokeRect(foodX, foodY, 10, 10);
}

food();
drawFood();

main();




