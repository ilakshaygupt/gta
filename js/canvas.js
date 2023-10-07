import Player from "./player.js"

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const image = new Image()
image.src = "../assets/GTA_MAP[1]_updated.png"

const upImages = [];
const downImages = [];
const leftImages = [];
const rightImages = [];
fillArray("up", 6, upImages);
fillArray("down", 9, downImages);
fillArray("left", 9, leftImages);
fillArray("right", 9, rightImages);

let player = new Player(512, 270, 69, 69, upImages);

class Sprite {
    constructor({ position, image }) {
        this.position = position
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

image.onload = () => {
    const background = new Sprite({
        position: {
            x: -1100,
            y: -1100
        },
        image: image
    })

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
        player.draw(context);
        window.requestAnimationFrame(animate);
    }

    animate();
}

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w = true;
            break;
        case 's':
            keys.s = true;
            break;
        case 'a':
            keys.a = true;
            break;
        case 'd':
            keys.d = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w = false;
            break;
        case 's':
            keys.s = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 'd':
            keys.d = false;
            break;
    }
});

function handleKeyPress() {
    if (keys.w ) {
        player.setAnimation(upImages);
    } else if (keys.a ) {
        player.setAnimation(leftImages);
    } else if (keys.s ) {
        player.setAnimation(downImages);
    } else if (keys.d ) {
        player.setAnimation(rightImages);
    }
}


setInterval(handleKeyPress, 1000/60);
