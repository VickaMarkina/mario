export class Player {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y: number};
  width!: number;
  height!: number;

  constructor(context: CanvasRenderingContext2D) {
    this.position = {
      x: 100,
      y: 100
    }
    this.width = 30
    this.height = 30
    this.context = context
  }

  draw() {
    this.context.fillStyle = 'red'
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height)

  }
}