export default class entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx, image) {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}