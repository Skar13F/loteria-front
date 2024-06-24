
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  /* Arreglo de todas las cartas posibles (51 cartas)
  allCards: Card[] = [
    { title: 'El Gallo', image: '/assets/img/1.jpg' },
    { title: 'El Diablito', image: 'assets/img/2.jpg' },
    { title: 'La Dama', image: 'assets/img/3.jpg' },
    { title: 'El Catrín', image: 'assets/img/4.jpg' },
    { title: 'El Paraguas', image: 'assets/img/5.jpg' },
    { title: 'La Sirena', image: 'assets/img/6.jpg' },
    { title: 'La Escalera', image: 'assets/img/7.jpg' },
    { title: 'La Botella', image: 'assets/img/8.jpg' },
    { title: 'El Barril', image: 'assets/img/9.jpg' },
    { title: 'El Árbol', image: 'assets/img/10.jpg' },
    { title: 'El Melón', image: 'assets/img/11.jpg' },
    { title: 'El Valiente', image: 'assets/img/12.jpg' },
    { title: 'El Gorrito', image: 'assets/img/13.jpg' },
    { title: 'La Muerte', image: 'assets/img/14.jpg' },
    { title: 'La Pera', image: 'assets/img/15.jpg' },
    { title: 'La Bandera', image: 'assets/img/16.jpg' },
    { title: 'El Bandolón', image: 'assets/img/17.jpg' },
    { title: 'El Violoncello', image: 'assets/img/18.jpg' },
    { title: 'La Garza', image: 'assets/img/19.jpg' },
    { title: 'El Pájaro', image: 'assets/img/20.jpg' },
    { title: 'La Mano', image: 'assets/img/21.jpg' },
    { title: 'La Bota', image: 'assets/img/22.jpg' },
    { title: 'La Luna', image: 'assets/img/23.jpg' },
    { title: 'El Cotorro', image: 'assets/img/24.jpg' },
    { title: 'El Borracho', image: 'assets/img/25.jpg' },
    { title: 'El Negrito', image: 'assets/img/26.jpg' },
    { title: 'El Corazón', image: 'assets/img/27.jpg' },
    { title: 'La Sandía', image: 'assets/img/28.jpg' },
    { title: 'El Tambor', image: 'assets/img/29.jpg' },
    { title: 'El Camarón', image: 'assets/img/30.jpg' },
    { title: 'Las Jaras', image: 'assets/img/31.jpg' },
    { title: 'El Músico', image: 'assets/img/32.jpg' },
    { title: 'La Araña', image: 'assets/img/33.jpg' },
    { title: 'El Soldado', image: 'assets/img/34.jpg' },
    { title: 'La Estrella', image: 'assets/img/35.jpg' },
    { title: 'El Cazo', image: 'assets/img/36.jpg' },
    { title: 'El Mundo', image: 'assets/img/37.jpg' },
    { title: 'El Apache', image: 'assets/img/38.jpg' },
    { title: 'El Nopal', image: 'assets/img/39.jpg' },
    { title: 'El Alacrán', image: 'assets/img/40.jpg' },
    { title: 'La Rosa', image: 'assets/img/41.jpg' },
    { title: 'La Calavera', image: 'assets/img/42.jpg' },
    { title: 'La Campana', image: 'assets/img/43.jpg' },
    { title: 'El Cantarito', image: 'assets/img/44.jpg' },
    { title: 'El Venado', image: 'assets/img/45.jpg' },
    { title: 'El Sol', image: 'assets/img/46.jpg' },
    { title: 'La Corona', image: 'assets/img/47.jpg' },
    { title: 'La Chalupa', image: 'assets/img/48.jpg' },
    { title: 'El Pino', image: 'assets/img/49.jpg' },
    { title: 'El Pescado', image: 'assets/img/50.jpg' },
    { title: 'La Palma', image: 'assets/img/51.jpg' }
  ];*/

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

    if (state) {
      //this.roomId = state['roomId'];
      this.jugador = state['jugador'];
      if (this.jugador && this.jugador.carton && this.jugador.carton.cartasEnCarton) {
        this.tarjetas = this.jugador.carton.cartasEnCarton.map((carta: any) => ({
          id: carta.idCarta,
          title: carta.nombre,
          image: carta.rutaCarta
        }));
      }
    } else {
      // En caso donde no hay estado de navegación
      console.error('No se recibieron datos en la navegación');
    }
    // Generar el tablero de lotería al inicializar el componente
    //this.generateBoard();
  }

  /* Generar el tablero barajando y seleccionando 16 cartas
  generateBoard(): void {
    // Barajar las cartas
    const shuffled = this.shuffleArray([...this.allCards]);
    // Seleccionar las primeras 16 cartas
    this.tarjetas = shuffled.slice(0, 16);
  }*/

  // Método para barajar un arreglo usando el algoritmo de Fisher-Yates
  shuffleArray(array: Card[]): Card[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


}
