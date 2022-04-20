export class Player {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y: number};
  velocity!: {x: number, y: number};
  width!: number;
  height!: number;
  gravity!: number;
  canvas!: HTMLCanvasElement;
  speed: number = 10

  constructor( canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, gravity: number) {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
    this.context = context
    this.gravity = gravity
    this.canvas = canvas
  }

  draw() {
    this.context.fillStyle = 'red'
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if(this.position.y + this.height + this.velocity.y <= this.canvas.height){
      this.velocity.y += this.gravity
    }
  }
}