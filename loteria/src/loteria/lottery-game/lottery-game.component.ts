import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lottery-game',
  standalone: true,  // Indica que este componente es standalone
  imports: [CommonModule],  // Importa CommonModule para usar *ngFor
  templateUrl: './lottery-game.component.html',
  styleUrl: './lottery-game.component.css'
})
export class LotteryGameComponent {
  // Crear una cuadrícula de 4x4
  grid: boolean[][] = Array(4).fill(null).map(() => Array(4).fill(false));

  // Manejar el clic en un rectángulo
  handleClick(row: number, col: number): void {
    this.grid[row][col] = true;
  }
}
