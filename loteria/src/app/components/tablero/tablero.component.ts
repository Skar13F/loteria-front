import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from '../../models/jugador';
import { JugadorService } from '../../services/jugador.service';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';

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
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css',
})
export class TableroComponent implements OnInit {
  roomId: string = '';
  jugadorId: string = '';
  jugador: Jugador | null = null;

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

  constructor(
    private chatService: ChatService,
    private router: Router,
    private jugadorService: JugadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { [key: string]: any };
  
    this.route.paramMap.subscribe((paramMap) => {
      const roomId = paramMap.get('roomId');
      const jugadorId = paramMap.get('idJugador');
  
      if (roomId && jugadorId) {
        this.roomId = roomId;
        this.jugadorId = jugadorId;
  
        this.obtenerJugador();
        this.pintarCartas();
      } else {
        console.error('No se recibieron datos del jugador y roomId');
      }
    });

    //abrimos la conexión websocket
    this.chatService.joinRoom(this.roomId);
  }
  
  private obtenerJugador(): void {
    this.jugadorService.obtenerJugador(this.roomId, this.jugadorId).subscribe(
      (data) => {
        this.jugador = data;
        this.usuario.nombre = this.jugador.nombre;
      },
      (error) => {
        console.error('Error al obtener el jugador:', error);
      }
    );
  }

  private pintarCartas(): void {
    if (this.jugador && this.jugador.carton.cartasEnCarton) {
      for (const carta of this.jugador.carton.cartasEnCarton) {
        const card: Card = {
          id: carta.idCarta,
          title: carta.nombre,
          image: carta.rutaCarta
        };
        this.tarjetas.push(card);
      }
    } else {
      console.error('El jugador no tiene cartas o el objeto jugador es nulo.');
    }
  }

  //metodo para enviar mensajes por el websocket
  sendMessage() {
    const chatMessage = {
      roomId: this.roomId,
      userId: this.jugador?.idJugador,
    } as ChatMessage;

    this.chatService.sendMessage(this.roomId, chatMessage);
    
  }
   
}
