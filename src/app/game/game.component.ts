import { Component, OnInit } from '@angular/core';
import { Enemy } from './classes/enemy.class';
import { GenericObject } from './classes/genericobject.class';
import { Particle } from './classes/particle.class';
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
  enemies!: Enemy[];
  particles!: Particle[];

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
  currentKey!: string;

  platformSrc = '/assets/img/platform.png';
  platformXsSrc = '/assets/img/platform.xs.png';
  blockSrc = '/assets/img/block.png';
  pooSrc = '/assets/img/poo.png';
  backgroundSrc = '/assets/img/background.png';
  hillsSrc = '/assets/img/hills.png';
  spriteRunLeftScr = '/assets/img/spriteRunLeft.png';
  spriteRunRightScr = '/assets/img/spriteRunRight.png';
  spriteStandLeftScr = '/assets/img/spriteStandLeft.png';
  spriteStandRightScr = '/assets/img/spriteStandRight.png';

  platformImg = this.createImage(this.platformSrc);
  platformXsImg = this.createImage(this.platformXsSrc);
  blockImg = this.createImage(this.blockSrc);
  pooImg = this.createImage(this.pooSrc);
  sprites = {
    stand:{
      right: this.createImage(this.spriteStandRightScr),
      left: this.createImage(this.spriteStandLeftScr),
      cropWidth: 177,
      width: 66
    },    
    run:{
      right: this.createImage(this.spriteRunRightScr),
      left: this.createImage(this.spriteRunLeftScr),
      cropWidth: 341,
      width: 127.875
    }
  }

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
    this.player  = new Player(this.canvas, this.context, this.gravity, this.sprites);    

    this.platforms = [
      new Platform(this.context, this.platformImg.width * 4 + 400 - 4 + this.platformXsImg.width, 353, this.platformXsImg),
      new Platform(this.context, this.platformImg.width * 6 + 800 - 2, 403, this.platformXsImg),
      new Platform(this.context, this.platformImg.width * 6 + 800 - 2 + this.platformXsImg.width, 203, this.platformXsImg),

      new Platform(this.context, this.platformImg.width * 7 + 900, 143, this.blockImg),
      new Platform(this.context, this.platformImg.width * 8 + 800, 193, this.blockImg),
      new Platform(this.context, this.platformImg.width * 9 + 800, 363, this.blockImg),
      new Platform(this.context, this.platformImg.width * 11 + 800, 363, this.blockImg),

      new Platform(this.context, -1, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 2 + 200, 530, this.platformXsImg),
      new Platform(this.context, this.platformImg.width * 3 + 300, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 4 + 400 - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 5 + 800 - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 10 + 800 - 2, 530, this.platformImg),
      new Platform(this.context, this.platformImg.width * 11 + 950 - 2, 530, this.platformImg),
    ]

    this.genericObjects = [new GenericObject(this.context, -1, -1, this.createImage(this.backgroundSrc)),
       new GenericObject(this.context, -1, -1, this.createImage(this.hillsSrc))
    ]

    this.scrollOfset = 0;

    this.particles = [];

    this.createEnemies();
  }

  createEnemies(){
    this.enemies = [
      new Enemy(this.canvas, this.context, this.pooImg, 250, 475)
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

    this.enemies.forEach((enemy) => {
      enemy.update();
    })

    this.player.update();

    if(this.keys.right.pressed && this.player.position.x < 400){
      this.player.velocity.x = this.player.speed

    } else if((this.keys.left.pressed && this.player.position.x > 100) ||
     (this.keys.left.pressed && this.scrollOfset === 0 && this.player.position.x > 0)) {

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

        this.enemies.forEach((enemy) => {
          enemy.position.x -= this.player.speed * .66
          enemy.startPos -= this.player.speed * .66
        })
      } else if(this.keys.left.pressed && this.scrollOfset > 0){
        this.scrollOfset -= this.player.speed

        this.platforms.forEach((platform) => {
          platform.position.x += this.player.speed
        })

        this.genericObjects.forEach((genericObject) => {
          genericObject.position.x += this.player.speed * .66
        })

        this.enemies.forEach((enemy) => {
          enemy.position.x += this.player.speed * .66
          enemy.startPos += this.player.speed * .66
        })
      }
    }

    //platforform collision detection
    this.platforms.forEach((platform) => {
      if(this.player.position.y + this.player.height <= platform.position.y &&
         this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y &&
         this.player.position.x + this.player.currentWidth >= platform.position.x &&
         this.player.position.x <= platform.position.x + platform.width){
        this.player.velocity.y = 0
      }
    })

    //sprite switching
    if(
      this.keys.right.pressed &&
      this.currentKey === 'right' && 
      this.player.currentSprite !== this.player.sprites.run.right){

      this.player.frames = 1
      this.player.currentSprite = this.player.sprites.run.right
      this.player.currentCropWidth = this.player.sprites.run.cropWidth
      this.player.currentWidth = this.player.sprites.run.width

    } else if(
      this.keys.left.pressed &&
      this.currentKey === 'left' &&
      this.player.currentSprite !== this.player.sprites.run.left) {

      this.player.currentSprite = this.player.sprites.run.left
      this.player.currentCropWidth = this.player.sprites.run.cropWidth
      this.player.currentWidth = this.player.sprites.run.width
    } else if(
      !this.keys.left.pressed &&
      this.currentKey === 'left' && 
      this.player.currentSprite !== this.player.sprites.stand.left) {

      this.player.currentSprite = this.player.sprites.stand.left
      this.player.currentCropWidth = this.player.sprites.stand.cropWidth
      this.player.currentWidth = this.player.sprites.stand.width
    } else if(
      !this.keys.right.pressed &&
      this.currentKey === 'right' && 
      this.player.currentSprite !== this.player.sprites.stand.right) {
        
      this.player.currentSprite = this.player.sprites.stand.right
      this.player.currentCropWidth = this.player.sprites.stand.cropWidth
      this.player.currentWidth = this.player.sprites.stand.width
    }

    //kill enemy
    this.enemies.forEach((enemy, index) => {
      if( enemy.position.x - enemy.width  <= this.player.position.x &&
         enemy.position.x  >= this.player.position.x &&
         enemy.position.y + 10 >= this.player.position.y + this.player.height &&
         enemy.position.y - 10 <= this.player.position.y + this.player.height 
        ){
        this.enemies.splice(index, 1)
        for(let i = 0; i < 10; i++){
          this.particles.push(new Particle(
            enemy.position.x,
            enemy.position.y,
            5,
            this.context,
            {x: (Math.random() - 0.5) * (Math.random() * 6) , 
              y:( Math.random() - 0.5) * (Math.random() * 6)}
          ))
        }
      }
    })

    this.particles.forEach((particle, index) => {
      if(particle.alpha <= 0) {
        this.particles.splice(index, 1)
      } else{
      particle.update()}
    })

    // win condition
    if(this.scrollOfset >  this.platformImg.width * 5 + 300) {
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
          this.currentKey = 'right'
          break
        case 'ArrowDown':
          break
        case  'ArrowLeft':
          this.keys.left.pressed = true
          this.currentKey = 'left'
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
