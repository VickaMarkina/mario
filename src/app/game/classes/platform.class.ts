export class Platform {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y:number};
  width!: number;
  height!: number;

  constructor(context: CanvasRenderingContext2D, x: number, y: number){
    this.position = {
      x,
      y
    }
    this.width = 200
    this.height = 20
    this.context = context
  }

  draw() {
    this.context.fillStyle = 'blue'
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
