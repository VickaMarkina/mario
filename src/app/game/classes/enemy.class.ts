export class Enemy {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y: number};
  velocity!: number;
  height!: number;
  canvas!: HTMLCanvasElement;
  speed: number = 10;
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
    this.velocity =  -1

    this.height = 150
    this.width = 50
    this.frames = 0
  } 

  draw() {
    this.context.drawImage(
      this.img,
      130 * this.frames,
      0,
      130,
      400,
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
    // this.position.x += this.velocity
    // if(this.position.x < this.startPos - 100){
    //   this.velocity = 1
    // } else if (this.position.x > this.startPos + 100){
    //   this.velocity = -1
    // }
  }
}