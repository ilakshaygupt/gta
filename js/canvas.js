const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

context.fillStyle = 'black' //in case the background image is not
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = "./assets/GTA_MAP[1]_updated.png"
console.log(image)

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
            x: 0,
            y: 0
        },
        image: image
    })

    function animate() {
        window.requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);


        if (keys.w.pressed) {
            background.position.y -= 2;
        } else if (keys.a.pressed) {
            background.position.x -= 2;
        } else if (keys.s.pressed) {
            background.position.y += 2;
        } else if (keys.d.pressed) {
            background.position.x += 2;
        }
        background.draw();
        console.log('animate');
        context.fillRect(512, 270, 50, 50);

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
    console.log(e.key)
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
    console.log(keys)
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


