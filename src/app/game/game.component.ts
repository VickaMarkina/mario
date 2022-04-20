import { Component, OnInit } from '@angular/core';
import { GenericObject } from './classes/genericobject.class';
import { Platform } from './classes/platform.class';
import { Player } from './classes/player.class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  player!: Player;
  platforms!: Platform[];
  genericObjects!: GenericObject[];

  gravity: number = 1.5;
  keys: {right: {pressed: Boolean}, left: {pressed: Boolean}} = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  }
  scrollOfset: number = 0;

  platformSrc = '/assets/img/platform.png';
  platformXsSrc = '/assets/img/platform.xs.png';
  backgroundSrc = '/assets/img/background.png';
  hillsSrc = '/assets/img/hills.png';

  platformImg = this.createImage(this.platformSrc);
  platformXsImg = this.createImage(this.platformXsSrc)

  constructor() { }

  ngOnInit(): void {
    let canvas = document.querySelector('canvas') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    this.canvas = canvas;
    this.context = context;

    this.init();
    this.animate();
    this.playerMovement();
  }

  createImage(imageSrc: string){
    let image = new Image();
    image.src = imageSrc;
    return image
  }

  init() {    
    this.player  = new Player(this.canvas, this.context, this.gravity);    

    this.platforms = [
      new Platform(this.context, this.platformImg.width * 4 + 300 - 4 + this.platformXsImg.width, 353, this.platformXsImg),
      new Platform(this.context, -1, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 2 + 100, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 3 + 300, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 4 + 300 - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 5 + 700 - 2, 530, this.platformImg),
    ]

    this.genericObjects = [new GenericObject(this.context, -1, -1, this.createImage(this.backgroundSrc)),
       new GenericObject(this.context, -1, -1, this.createImage(this.hillsSrc))
    ]

  }
  
  animate() {
    requestAnimationFrame(() => this.animate())
    this.context.fillStyle = 'rgb(172, 189, 222)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.genericObjects.forEach((genericObject) => {
      genericObject.draw();
    })
    
    this.platforms.forEach((platform) => {
      platform.draw();
    })

    this.player.update();

    if(this.keys.right.pressed && this.player.position.x < 400){
      this.player.velocity.x = this.player.speed
    } else if(this.keys.left.pressed && this.player.position.x > 100) {
      this.player.velocity.x = -this.player.speed
    } else {
      this.player.velocity.x = 0

      if( this.keys.right.pressed){
        this.scrollOfset += this.player.speed
        this.platforms.forEach((platform) => {
          platform.position.x -= this.player.speed
        })

        this.genericObjects.forEach((genericObject) => {
          genericObject.position.x -= this.player.speed * .66
        })
      } else if(this.keys.left.pressed){
        this.scrollOfset -= this.player.speed

        this.platforms.forEach((platform) => {
          platform.position.x += this.player.speed
        })

        this.genericObjects.forEach((genericObject) => {
          genericObject.position.x += this.player.speed * .66
        })
      }
    }

    //platforform collision detection
    this.platforms.forEach((platform) => {
      if(this.player.position.y + this.player.height <= platform.position.y &&
         this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y &&
         this.player.position.x + this.player.width >= platform.position.x &&
         this.player.position.x <= platform.position.x + platform.width){
        this.player.velocity.y = 0
      }
    })

    // win condition
    if(this.scrollOfset >  this.platformImg.width * 5 + 300 - 2) {
      console.log('you win')
    }

    // lose condition
    if(this.player.position.y > this.canvas.height){
      this.init();
    }
  }

  playerMovement() {
    addEventListener('keydown', ({ key }) => {
      switch(key) {
        case 'ArrowUp' :
            this.player.velocity.y -= 25
          break;
        case 'ArrowRight':
          this.keys.right.pressed = true
          break
        case 'ArrowDown':
          break
        case  'ArrowLeft':
          this.keys.left.pressed = true
          break
      }
    })

    addEventListener('keyup', ({ key }) => {
      switch(key) {
        case 'ArrowUp' :
          break;
        case 'ArrowRight':          
          this.keys.right.pressed = false
          break
        case 'ArrowDown':
          break
        case  'ArrowLeft':
          this.keys.left.pressed = false
          break
      }
    })
    
  }

}
