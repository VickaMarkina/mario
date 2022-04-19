import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
    let canvas = document.querySelector('canvas') as HTMLCanvasElement;
    let context = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    this.canvas = canvas;
    this.context = context;

    this.player  = new Player(this.canvas, this.context, this.gravity);
    this.platforms = [new Platform(this.context, 200, 100), new Platform(this.context, 500, 200)]

    this.animate();
    this.playerMovement();
  }
  
  animate() {
    requestAnimationFrame(() => this.animate())
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.update();

    this.platforms.forEach((platform) => {
      platform.draw();
    })

    if(this.keys.right.pressed && this.player.position.x < 400){
      this.player.velocity.x = 5
    } else if(this.keys.left.pressed && this.player.position.x > 100) {
      this.player.velocity.x = -5
    } else {
      this.player.velocity.x = 0

      if( this.keys.right.pressed){
        this.scrollOfset += 5
        this.platforms.forEach((platform) => {
          platform.position.x -= 5
        })
      } else if(this.keys.left.pressed){
        this.scrollOfset -= 5
        this.platforms.forEach((platform) => {
          platform.position.x += 5
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

    // win scenario
    if(this.scrollOfset > 3000) {

    }
  }

  playerMovement() {
    addEventListener('keydown', ({ key }) => {
      switch(key) {
        case 'ArrowUp' :
            this.player.velocity.y -= 20
          break;
        case 'ArrowRight':
          this.keys.right.pressed = true
          break
        case 'ArrowDown':
          this.player.velocity.y += 20
          break
        case  'ArrowLeft':
          this.keys.left.pressed = true
          break
      }
    })

    addEventListener('keyup', ({ key }) => {
      switch(key) {
        case 'ArrowUp' :
            this.player.velocity.y -= 20
          break;
        case 'ArrowRight':          
          this.keys.right.pressed = false
          break
        case 'ArrowDown':
          this.player.velocity.y += 20
          break
        case  'ArrowLeft':
          this.keys.left.pressed = false
          break
      }
    })
    
  }

}
