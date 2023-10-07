import Player from "./player.js"

const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//creating arrray to store collision points
const collisionMap = []
for (let i = 0; i < collisions.length; i = i + 100) {
    collisionMap.push(collisions.slice(i, i + 100))
}


//creating the collision object we want to render
class Boundary {
    static width = 40
    static height =40
    constructor({ position }) {
        this.position = position
        this.width = 40  // 16 pixel * 250% zoom level = 4000
        this.height = 40 // 16 pixel * 250% zoom level = 4000
    }

    //drawing the rectangles of collision
    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const offset= {
    x:0,
    y:0
  }

// filling up Boundaries array with collison objects
const Boundaries = [] 
//iterating each row
collisionMap.forEach((row , i) => {
    //iterating inside each row
    row.forEach((Symbol , j)=> {
        if(Symbol=== 13188)
        Boundaries.push(
            new Boundary({
                position :{
                    x: j*Boundary.width +offset.x,  
                    y: i*Boundary.height + offset.y
                }
            })
        )
    })
})

console.log(Boundaries)

const image = new Image()
image.src = "../assets/GTA_MAP[1]_updated.png"
// console.log(image)

let up = new Image();
let down = new Image();
let left = new Image();
let right = new Image();
up.src = "../images/up/1.png";
down.src = "../images/down/1.png";
left.src = "../images/left/1.png";
right.src = "../images/right/1.png";
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
            x: offset.x,
            y: offset.y
        },
        image: image
    })
    
   

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
       
       
        
        background.draw();
        

        //drawing the boundaries 
        Boundaries.forEach(Boundary => {
            Boundary.draw()
        })
        
        if (keys.w.pressed) {
            player.setAnimation(upImages);
            background.position.y += 2;
            Boundaries.forEach(boundary => {
                boundary.position.y+= 2;
            });
        } else if (keys.a.pressed) {
            player.setAnimation(leftImages);
            background.position.x += 2;
            Boundaries.forEach(boundary => {
                boundary.position.x += 2;
            });
        } else if (keys.s.pressed) {
            player.setAnimation(downImages);
            background.position.y -= 2;
            Boundaries.forEach(boundary => {
                boundary.position.y -= 2;
            });
        } else if (keys.d.pressed) {
            player.setAnimation(rightImages);
            background.position.x -= 2;
            Boundaries.forEach(boundary => {
                boundary.position.x -= 2;
            });
        }
       
       

    
        player.updateAnimation();
        player.draw(context);
        window.requestAnimationFrame(animate);


       

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