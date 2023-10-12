import Player from "./player.js"
let walkingSound= document.getElementById('walking-sound')
let collisionsound= document.getElementById('collision-sound')
let carSound= document.getElementById('car-sound')

const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')


const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;


function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    
    
    if (body.classList.contains('dark-mode')) {
        
        canvas.style.opacity = '0.5'; 
    } else {
       
        canvas.style.opacity = '1'; 
    }
}


toggleDarkModeButton.addEventListener('click', toggleDarkMode);



canvas.width = 1024
canvas.height = 576

//creating arrray to store collision points
const collisionMap = []
for (let i = 0; i < collisions.length; i = i + 100) {
    collisionMap.push(collisions.slice(i, i + 100))
}

let upCounter=0;
let downCounter=0;
let leftCounter=0;
let rightCounter=0;
let upCarCounter=0;
let downCarCounter=0;
let leftCarCounter=0;
let rightCarCounter=0;

class Boundary {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40  // 16 pixel * 250% zoom level = 4000
        this.height = 40 // 16 pixel * 250% zoom level = 4000
    }

    //drawing the rectangles of collision
    draw() {
        context.fillStyle = 'rgba(0,0,0,0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
let speedMultiplier=2;
class Airplane {
    constructor(canvasWidth, canvasHeight, image) {
        this.image = image;
        this.position = {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight
        };
        this.velocity = {
            x: (Math.random() - 0.5) ,
            y: (Math.random() - 0.5)   
        };
    }
    update() {  
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {  
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

const airplaneImage = new Image();
airplaneImage.src = '../assets/ballon.png';
const airplane = new Airplane(canvas.width, canvas.height, airplaneImage);

let isSpeedBoostActive=false;

const offset = {
    x: 0,
    y: 0
}

// filling up Boundaries array with collison objects
const Boundaries = []
//iterating each row
collisionMap.forEach((row, i) => {
    //iterating inside each row
    row.forEach((Symbol, j) => {
        if (Symbol === 13188)
            Boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})



const image = new Image()
image.src = '../assets/GTA_MAP[1]_updated.png'
const foregroundImage = new Image()
foregroundImage.src = '../assets/Foreground.png'

const aeroplaneImage = new Image()
aeroplaneImage.src = '../assets/aeroplane.png'

let up = new Image();
let down = new Image();
let left = new Image();
let right = new Image();
let upCar = new Image();
let downCar = new Image();
let leftCar = new Image();
let rightCar = new Image();
up.src = "../images/up/1.png";
down.src = "../images/down/1.png";
left.src = "../images/left/1.png";
right.src = "../images/right/1.png";
upCar.src = "../car/upCar/1.png";
downCar.src = "../car/downCar/1.png";
leftCar.src = "../car/leftCar/1.png";
rightCar.src = "../car/rightCar/1.png";
const upImages = [];
const downImages = [];
const leftImages = [];
const rightImages = [];
const upCarImages = [];
const downCarImages = [];
const leftCarImages = [];
const rightCarImages = [];
fillArray("up", 6, upImages);
fillArray("down", 9, downImages);
fillArray("left", 9, leftImages);
fillArray("right", 9, rightImages);
fillCarArray("upCar", 2, upCarImages);
fillCarArray("downCar", 2, downCarImages);
fillCarArray("leftCar", 2, leftCarImages);
fillCarArray("rightCar", 2, rightCarImages);

function fillCarArray(folder, count, images) {
    for (let i = 1; i <= count; i++) {
        const image = new Image();
        image.src = `./car/${folder}/${i}.png`;
        images.push(image);
    }
}
function fillArray(folder, count, images) {
    for (let i = 1; i <= count; i++) {
        const image = new Image();
        image.src = `./images/${folder}/${i}.png`;
        images.push(image);
    }
}
let player = new Player(512, 270, 64, 64, upImages);
let car = new Player(512, 270, 64, 64, upCarImages);
class Sprite {
    constructor({ position, image }) {
        this.position = position
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})
let lastKey = 'w'
let isCar = false;
player.setAnimation(downImages.slice(0, 1));
car.setAnimation(downCarImages.slice(0, 1));
image.onload = () => {
    const background = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: image
    })

    const foreground = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: foregroundImage
    })
    const aeroplane = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: aeroplaneImage
    })
    function iscoll({ rect1, rect2 }) {
        return (rect1.x + rect1.width - 20 >= rect2.position.x &&
            rect1.x <= rect2.position.x + rect2.width - 20
            && rect1.y + rect1.height - 8 >= rect2.position.y &&
            rect1.y <= rect2.position.y + rect2.height - 50)
    }
    function animate() {

        context.clearRect(0, 0, canvas.width, canvas.height);
        background.draw()
        if(isCar){
                upCounter=0;
                leftCounter=0;
                rightCounter=0;
                downCounter=0;
            car.draw(context)
        }
       else if(!isCar) {
        upCarCounter=0;
        leftCarCounter=0;
        rightCarCounter=0;
        downCarCounter=0;
        player.draw(context)
       }
        foreground.draw()
        Boundaries.forEach(Boundary => {
            Boundary.draw()
        })

        airplane.update();
        airplane.draw(context);
        let moving = true;
       
        if (keys.w.pressed && lastKey === 'w') {
            for (let i = 0; i < Boundaries.length; i++) {
                let curr = Boundaries[i];
                if (iscoll({
                    rect1: player, rect2: {
                        ...curr, position: {
                            x: curr.position.x,
                            y: curr.position.y + 6
                        }
                    }
                })) {
                    moving = false;
                    collisionsound.play()
                    break;
                }
            }
            if(isCar){
                car.setAnimation(upCarImages.slice(upCounter,upCarImages.length));
                upCarCounter=(upCarCounter+1)%upCarImages.length;
            }
            else{
                player.setAnimation(upImages.slice(upCounter,upImages.length));
                upCounter=(upCounter+1)%upImages.length;
            }
           
            if (moving) {
                if (isSpeedBoostActive || isCar) {
                    walkingSound.pause()
                    background.position.y += 2 * speedMultiplier;
                    foreground.position.y += 2 * speedMultiplier;
                    Boundaries.forEach(boundary => {
                        boundary.position.y += 2 * speedMultiplier;
                    });
                    airplane.position.y += 2*speedMultiplier;
                }
                    else{
                        background.position.y += 2;
                foreground.position.y +=2 ;
                Boundaries.forEach(boundary => {
                    boundary.position.y += 2;
                });
                airplane.position.y += 2;

            }
            }
        } else if (keys.a.pressed && lastKey === 'a') {
            for (let i = 0; i < Boundaries.length; i++) {
                let curr = Boundaries[i];
                if (iscoll({
                    rect1: player, rect2: {
                        ...curr, position: {
                            x: curr.position.x + 6,
                            y: curr.position.y
                        }
                    }
                })) {
                    moving = false;
                    collisionsound.play()
                    break;
                }
            }
            if(isCar){
                car.setAnimation(leftCarImages.slice(leftCounter,leftCarImages.length));
                leftCarCounter=(leftCarCounter+1)%leftCarImages.length;
            }
            else{
                player.setAnimation(leftImages.slice(leftCounter,leftImages.length));
            leftCounter=(leftCounter+1)%leftImages.length;
            }
            
            if (moving) {
                if(isSpeedBoostActive || isCar){
                    walkingSound.pause()
                    background.position.x += 2 * speedMultiplier; 
                    foreground.position.x += 2 * speedMultiplier;
                    Boundaries.forEach(boundary => {
                        boundary.position.x += 2 * speedMultiplier;
                    });
                    airplane.position.x += 2*speedMultiplier;
                }
                background.position.x += 2;
                foreground.position.x +=2;
                Boundaries.forEach(boundary => {
                    boundary.position.x += 2;
                });
                airplane.position.x += 2;
            }
        } else if (keys.s.pressed && lastKey === 's') {
            for (let i = 0; i < Boundaries.length; i++) {
                let curr = Boundaries[i];
                if (iscoll({
                    rect1: player, rect2: {
                        ...curr, position: {
                            x: curr.position.x,
                            y: curr.position.y - 6
                        }
                    }
                })) {
                    moving = false;
                    collisionsound.play()
                    break;
                }
            }
            if(isCar){
                car.setAnimation(downCarImages.slice(downCounter,downCarImages.length));
                downCarCounter=(downCarCounter+1)%downCarImages.length;
            }
            else{
                player.setAnimation(downImages.slice(downCounter,downImages.length));
                downCounter=(downCounter+1)%downImages.length;
            }

            if (moving) {
                if(isSpeedBoostActive || isCar){
                    walkingSound.pause()
                    background.position.y -= 2 * speedMultiplier;
                    foreground.position.y -= 2 * speedMultiplier;
                    Boundaries.forEach(boundary => {
                        boundary.position.y -= 2 * speedMultiplier;
                    });
                    airplane.position.y -= 2*speedMultiplier;
                }
                background.position.y -= 2;
                foreground.position.y -= 2;
                Boundaries.forEach(boundary => {
                    boundary.position.y -= 2;
                });
                airplane.position.y -= 2;
            }
        } else if (keys.d.pressed && lastKey === 'd') {
            for (let i = 0; i < Boundaries.length; i++) {
                let curr = Boundaries[i];
                if (iscoll({
                    rect1: player, rect2: {
                        ...curr, position: {
                            x: curr.position.x - 6,
                            y: curr.position.y
                        }
                    }
                })) {
                    moving = false;
                    collisionsound.play()
                    break;
                }
            }
            if(isCar){
                car.setAnimation(rightCarImages.slice(rightCounter,rightCarImages.length));
                rightCarCounter=(rightCarCounter+1)%rightCarImages.length;
            }
            else{
                player.setAnimation(rightImages.slice(rightCounter,rightImages.length));
                rightCounter=(rightCounter+1)%rightImages.length;
            }
            if (moving) {
                if(isSpeedBoostActive || isCar){
                    walkingSound.pause()
                    background.position.x -= 2 * speedMultiplier; 
                    foreground.position.x -= 2 * speedMultiplier;
                    Boundaries.forEach(boundary => {
                        boundary.position.x -= 2 * speedMultiplier;
                    });
                    airplane.position.x -= 2*speedMultiplier;
                }
                background.position.x -= 2;
                foreground.position.x -=2;
                Boundaries.forEach(boundary => {
                    boundary.position.x -= 2;
                });
                airplane.position.x -= 2;
            }
        }
        window.requestAnimationFrame(animate);
    }
    animate()
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    u:{
        pressed:false
    },
    r:{
        pressed:false
    }   
}
window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            walkingSound.play()
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            walkingSound.play()
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            walkingSound.play()
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            walkingSound.play()
            break
        case 'm':
            toggleMusic();
            break
        case 'c':
            changeMusic();
            break;
        case 'u':
            isSpeedBoostActive=!isSpeedBoostActive;
            break;
        case 'r':
            isCar=!isCar;
            break;
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            walkingSound.pause()
            if(isCar) car.setAnimation(upCarImages.slice(0, 1));
            else player.setAnimation(upImages.slice(0, 1)); 
            break;
        case 's':
            keys.s.pressed = false;
            walkingSound.pause()
            if(isCar) car.setAnimation(downCarImages.slice(0, 1));
           else  player.setAnimation(downImages.slice(0, 1)); 
            break;
        case 'a':
            keys.a.pressed = false;
            walkingSound.pause()
            if(isCar) car.setAnimation(leftCarImages.slice(0, 1));
            else player.setAnimation(leftImages.slice(0, 1));
            
            break;
        case 'd':
            keys.d.pressed = false;
            walkingSound.pause()
            if(isCar) car.setAnimation(rightCarImages.slice(0, 1));
           else  player.setAnimation(rightImages.slice(0, 1));
            break;
    }
});
const audioFiles = [
    '../assets/audio/1.mp3',
    '../assets/audio/2.mp3' 
];
let currentAudioIndex=0;
const bgMusic = new Audio(audioFiles[currentAudioIndex]);
let isMusicPlaying = false;
bgMusic.loop = true;
function changeMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length; 
        bgMusic.src = audioFiles[currentAudioIndex]; 
        bgMusic.volume=0.3
        bgMusic.play();
        
    }
}
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
    } else {
        bgMusic.volume=0.3
        bgMusic.play();
        isMusicPlaying = true;
    }
}