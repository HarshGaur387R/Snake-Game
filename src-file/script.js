// GAME CONSTANT

let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 9, y: 9 }];
let food = { x: 6, y: 6 };
let board = document.getElementById('board');
let score = 0;
let highScore = 0;


// GAME FUNCTIONS


function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();

}


function isCollide(snake = [{ x: 0, y: 0 }]) {


    // If snake eat itself.
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If snake bump into the wall.
    if ((snake[0].x >= 18 || snake[0].x <= 0) || (snake[0].y >= 18 || snake[0].y <= 0)) {
        return true;
    }

}


function gameEngine() {

    // PART 1 : Updating the snake array and food.

    //  : Checking snake collide -

    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert(`[SCORE: ${score}] Press any Direction to start again!`);
        document.getElementById('score').innerHTML = `SCORE:0`;
        if (score > highScore) {
            highScore = score;
        document.getElementById('highScore').innerHTML = `HIGH-SCORE:${highScore}`;
        }
        snakeArr = [{ x: 9, y: 9 }];
        score = 0;
    }

    //  : Checking if food is eaten.
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score++;
        document.getElementById('score').innerHTML = `SCORE:${score}`;

        /* For adding block from last of the array. */
        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x + inputDir.x, y: snakeArr[snakeArr.length - 1].y + inputDir.y });


        /* For adding block from start of the array. */
        // snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})

        let a = 2;
        let b = 16;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    // : Moving snake -

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // PART 2 : Display snake array and food.

    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snakeHead');
        }
        else if (index > 0) {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement)
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakeFood');
    board.appendChild(foodElement);
}






// MAIN LOGIC

//  : Starting game loop.
window.requestAnimationFrame(main);

document.getElementById('score').innerHTML = `SCORE:${score}`;
// Action on key pressed ;

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (inputDir.y === 1) {
                break;
            }
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            if (inputDir.y === -1) {
                break;
            }
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            if (inputDir.x === 1) {
                break;
            }
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            if (inputDir.x === -1) {
                break;
            }
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});


document.getElementById('upKey').addEventListener('click', e => {
    if (inputDir.y === 1) {
        return;
    }
    inputDir.x = 0;
    inputDir.y = -1;
});

document.getElementById('downKey').addEventListener('click', e => {
    if (inputDir.y === -1) {
        return;
    }
    inputDir.x = 0;
    inputDir.y = 1;
});

document.getElementById('leftKey').addEventListener('click', e => {
    if (inputDir.x === 1) {
        return;
    }
    inputDir.x = -1;
    inputDir.y = 0;
});

document.getElementById('rightKey').addEventListener('click', e => {
    if (inputDir.x === -1) {
        return;
    }
    inputDir.x = 1;
    inputDir.y = 0;
});