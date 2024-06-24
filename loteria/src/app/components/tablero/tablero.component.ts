
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';


// Interfaz para representar una carta
interface Card {
  id: number;
  title: string;
  image: string;
}

// Interfaz para representar un usuario
interface Usuario {
  nombre: string;
  puntuacion: number;
}

// Interfaz para representar un puntaje
interface Puntaje {
  nombre: string;
  puntuacion: number;
}


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

  roomId: string="";
  jugador: any;

  // Arreglo de cartas que se mostrarán en el tablero
  tarjetas: Card[] = [];

  // Información del usuario
  usuario: Usuario = { nombre: 'Usuario', puntuacion: 0 };

  // Arreglo con los mejores puntajes
  mejoresPuntajes: Puntaje[] = [
    { nombre: 'Usuario 1', puntuacion: 100 },
    { nombre: 'Usuario 2', puntuacion: 90 },
    // ... Agregar más puntajes si es necesario
  ];

  // Columnas que se mostrarán en la tabla de mejores puntajes
  displayedColumns: string[] = ['nombre', 'puntuacion'];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { [key: string]: any };
    if (this.jugador) {
      console.log('Jugador:', this.jugador);
      console.log('Room ID:', this.roomId);
    } else {
      console.error('No se recibieron datos del jugador y roomId');
    }
  }



}
