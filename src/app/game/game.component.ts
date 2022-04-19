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
  }
  
  animate() {
    requestAnimationFrame(() => this.animate())
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.update();
  }

}
