export class Player {
  context!: CanvasRenderingContext2D;
  position!: {x: number, y: number};
  velocity!: {x: number, y: number};
  height!: number;
  gravity!: number;
  canvas!: HTMLCanvasElement;
  speed: number = 10;
  frames!: number;
  sprites!: {stand:{right: CanvasImageSource, left: CanvasImageSource, cropWidth: number, width: number}, run:{right: CanvasImageSource, left: CanvasImageSource, cropWidth: number, width: number}};
  currentSprite!: CanvasImageSource;
  currentCropWidth!: number;
  currentWidth!: number;

  constructor( canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, gravity: number,
     sprites: {stand:{right: CanvasImageSource, left: CanvasImageSource, cropWidth: number, width: number},
               run:{right: CanvasImageSource, left: CanvasImageSource, cropWidth: number, width: number}}) {

    this.context = context
    this.gravity = gravity
    this.canvas = canvas
    this.sprites = sprites

    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.height = 150
    this.frames = 0
    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = this.sprites.stand.cropWidth
    this.currentWidth = this.sprites.stand.width
  } 

  draw() {
    this.context.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x, 
      this.position.y, 
      this.currentWidth, 
      this.height)
  }

  update(){
    this.frames++
    if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
      this.frames = 0
    } else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)){
      this.frames = 0
    }

    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if(this.position.y + this.height + this.velocity.y <= this.canvas.height){
      this.velocity.y += this.gravity
    }
  }
}