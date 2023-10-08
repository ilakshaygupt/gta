import entity from "./entity.js";
let gameFrame = 0;
export default class Player extends entity {
  constructor(x, y, width, height, defaultImages) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.animationFrames = defaultImages;
    this.currentFrame = 0;
    this.jumping = false;
    this.initialY = this.y;
  }
  draw(ctx) {
    ctx.drawImage(
      this.animationFrames[this.currentFrame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  setAnimation(images) {
    this.animationFrames = images;
    this.currentFrame = 0;
  }

}