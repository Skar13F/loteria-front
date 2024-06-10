
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [
  
    CommonModule,
    MatCardModule,
    MatTableModule,
   
  ],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {
  usuario = { nombre: 'Jugador 1', puntuacion: 0 };
  tarjetas = Array.from({ length: 16 }, (_, i) => `Tarjeta ${i + 1}`);
  mejoresPuntajes = [
    { nombre: 'Jugador 1', puntuacion: 100 },
    { nombre: 'Jugador 2', puntuacion: 90 },
    { nombre: 'Jugador 3', puntuacion: 80 }
  ];
  displayedColumns: string[] = ['nombre', 'puntuacion'];

  constructor() {}

  ngOnInit(): void {}
}
