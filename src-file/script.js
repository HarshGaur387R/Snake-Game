// GAME CONSTANT

let inputDir = { x: 0, y: 0 };
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [{ x: 9, y: 9 }];
let food = { x: 6, y: 6 };
let board = document.getElementById('board');
let score = 0;





// GAME FUNCTIONS


function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();

}


function isCollide(snakeArr) {
    return false;
}


function gameEngine() {

 // PART 1 : Updating the snake array and food.

 //  : Checking snake collide

    if(isCollide(snakeArr)){
        inputDir = {x:0,y:0};
        alert('Game Over. Press any key to start again!');
        snakeArr = [{x:9,y:9}];
        score = 0;
    }

 //  : Checking if food is eaten.
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score++;
        
        
    }



 // PART 2 : Display snake array and food.
    board.innerHtml = '';
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

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} // Start the game
    // console.log(e.key);

    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;    
            break;
        
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});