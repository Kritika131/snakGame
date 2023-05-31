//Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let board = document.getElementById('board');
let scoreBox = document.getElementById('scoreBox');
let hiscoreBox = document.querySelector('#highscore');
let msg = document.querySelector('.msg');
let sound_icon = document.querySelector('.sound-icon');




let score = 0;
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

    // console.log(ctime);
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if snake is bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

let play=true;

function gameEngine() {

   

    //Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        
        gameOverSound.play();
        musicSound.pause();
        play=false;
        inputDir = { x: 0, y: 0 };
        msg.innerText = "Game over, Press any key to play again!"
        window.scroll(0, 0);
        // alert('Game over, Press any key to play again! ');

        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        play=true;
        
        score = 0;

    }



    //if you have eaten the food increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;

        }
        scoreBox.innerHTML = score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display the snake

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}





//Main logic starts here

let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
//whenever you want to render any animation use window.requestAnimationFrame(method/function) - it take a method which we render repeatedly.

window.addEventListener('keydown', e => {
    msg.innerText = "";
    inputDir = { x: 0, y: 1 }//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDOwn")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;

    }
})


sound_icon.addEventListener("click", () => {
    
    // console.log('click');
    if (play) {
        musicSound.pause();
        play=false;
        console.log("pause")
        sound_icon.innerHTML = '<i class="sound-icon fa-solid fa-volume-xmark" ></i>';

    } else {
        musicSound.play();
        play=true;
        console.log("play");
        sound_icon.innerHTML = '<i class="sound-icon fa-solid fa-volume-high" ></i>';
    }
})

