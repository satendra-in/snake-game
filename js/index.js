//Variable and Constant
let inputDirection = {x:0, y:1};

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 5;
let lastPaintTime = 0;
let scoree = 0;
let currKey = 2

let snakeArray = [
    { x:13, y:15 }
];
foodPosition = { x:10, y:10}
musicSound.play();

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArray){
    if(snakeArray[0].x === 30 || snakeArray[0].y === 30 || snakeArray[0].x === 0 || snakeArray[0].y === 0){
        return true;
    }
    for(let index = 1; index < snakeArray.length; index++){
        if(snakeArray[index].x === snakeArray[0].x && snakeArray[index].y === snakeArray[0].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){

    if(isCollide(snakeArray)){
        musicSound.pause();
        gameOverSound.play();
        speed = 5;
        inputDirection = {x:0, y:1};
        snakeArray = [
            { x:13, y:15 }
        ];
        foodPosition = { x:10, y:10};
        scoree = 0;
        score.innerHTML = "Score: " + scoree
        currKey = 2;
        alert('Game Over - Please press Enter to restart!!!')

    }

    if(snakeArray[0].x === foodPosition.x &&snakeArray[0].y === foodPosition.y){
        foodSound.play();
        scoree += 1;
        score.innerHTML = "Score: " + scoree
        snakeArray.unshift( {x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y});
        let a = 4; let b = 26;
        foodPosition = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
        speed += 0.5;
    }

    for(let index = snakeArray.length - 2; index >= 0; index--){
        //const currElement = snakeArray[index];
        snakeArray[index + 1] = {...snakeArray[index]};
    }
    
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y; 

    board.innerHTML = '';
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=> {
    moveSound.play();
    
    switch(e.key){
        case 'ArrowUp':
            //console.log('UP');
            if(currKey !== 2){
                inputDirection.x = 0;
                inputDirection.y = -1;
                currKey = 1;
            }
            break;
        case 'ArrowDown':
            //console.log('DOWN');
            if(currKey !== 1){
                inputDirection.x = 0;
                inputDirection.y = 1;
                currKey = 2;
            }
            break;
        case 'ArrowLeft':
            //console.log('LEFT');
            if(currKey !== 4){
                inputDirection.x = -1;
                inputDirection.y = 0;
                currKey = 3;
            }
            break;
        case 'ArrowRight':
            //console.log('RIGHT');
            if(currKey !== 3){
                inputDirection.x = 1;
                inputDirection.y = 0;
                currKey = 4;
            }
            break;
        default:
            break;
    }
})
