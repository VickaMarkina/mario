import { Component, OnInit } from '@angular/core';
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

  gravity: number = 1.5;
  keys: {right: {pressed: Boolean}, left: {pressed: Boolean}} = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
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

    this.player  = new Player(this.canvas, this.context, this.gravity);
    this.animate();
    this.playerMovement()
  }
  
  animate() {
    requestAnimationFrame(() => this.animate())
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.update();

    if(this.keys.right.pressed){
      this.player.velocity.x = 5
    } else if(this.keys.left.pressed) {
      this.player.velocity.x = -5
    } else this.player.velocity.x = 0
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
