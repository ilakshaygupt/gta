import Player from "./player.js"

const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576



const image = new Image()
image.src = "../assets/GTA_MAP[1]_updated.png"
// console.log(image)

let up = new Image();
let down = new Image();
let left = new Image();
let right = new Image();
up.src="../images/up/1.png";
down.src="../images/down/1.png";
left.src="../images/left/1.png";
right.src="../images/right/1.png";
const upImages = [];
const downImages = [];
const leftImages = [];
const rightImages = [];

fillArray("up", 6, upImages);
fillArray("down", 9, downImages);
fillArray("left", 9, leftImages);
fillArray("right", 9, rightImages);


function fillArray(folder, count, images) {
  for (let i = 1; i <= count; i++) {
    const image = new Image();
    image.src = `./images/${folder}/${i}.png`;
    images.push(image);
  }
}
let player=new Player(512,270,69,69,upImages);

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
        player.updateAnimation();
        player.draw(context);
        window.requestAnimationFrame(animate);


        if (keys.w.pressed) {
            background.position.y += 2;
            player.setAnimation(upImages);
        } else if (keys.a.pressed) {
            background.position.x += 2;
            player.setAnimation(leftImages);
        } else if (keys.s.pressed) {
            background.position.y -= 2;
            player.setAnimation(downImages);
        } else if (keys.d.pressed) {
            background.position.x -= 2;
            player.setAnimation(rightImages);
        }

        // context.fillRect(512, 270, 50, 50);

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
    }

}

window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break

        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
    console.log(keys)
})


