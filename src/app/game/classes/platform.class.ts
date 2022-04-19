export class Platform {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y:number};
  width!: number;
  height!: number;
  image!: CanvasImageSource;

  constructor(context: CanvasRenderingContext2D, x: number, y: number, image: CanvasImageSource){
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width as number
    this.height = image.height as number
    this.context = context
  }

  draw() {
    this.context.drawImage(this.image, this.position.x, this.position.y)
  }
}
