export class Flower {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y: number};
  velocity!: number;
  height!: number;
  canvas!: HTMLCanvasElement;
  frames!: number;
  width!: number;
  img!: CanvasImageSource;
  startPos!: number;

  constructor( canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number)
      {

    this.context = context
    this.canvas = canvas
    this.img = img
    this.startPos = x

    this.position = {
      x,
      y
    }

    this.height = 400
    this.width = 55
    this.frames = 0
  } 

  draw() {
    this.context.drawImage(
      this.img,
      56 * this.frames,
      0,
      56,
      300,
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height)
  }

  update(){
    this.frames++
    if(this.frames > 59) {
      this.frames = 0
    } 
    this.draw()
  }
}