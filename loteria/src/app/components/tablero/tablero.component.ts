import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from '../../models/carta';
import { Jugador } from '../../models/jugador';
import { ChatService } from '../../services/chat.service';
import { JugadorService } from '../../services/jugador.service';
import { RoomService } from '../../services/room.service';

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
  idJugador: string = '';
  jugador: Jugador | null = null;
  public cartaMostrar: any;
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

  //isButtonDisabled: boolean = false; // Estado para el botón
  public buttonDisabled: boolean = false;

  constructor(
    private chatService: ChatService,
    private roomService: RoomService,
    private router: Router,
    private jugadorService: JugadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idJugador = this.route.snapshot.queryParams['idJugador'];
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { [key: string]: any };

    this.route.paramMap.subscribe((paramMap) => {
      const roomId = paramMap.get('roomId');

      if (roomId && this.idJugador) {
        this.roomId = roomId;
        this.idJugador = this.idJugador;

        this.obtenerJugador();
      } else {
        console.error('No se recibieron datos del jugador y roomId');
      }
    });

    //abrimos la conexión websocket
    this.chatService.joinRoom(this.roomId);
    this.getCarta();
    this.listenerMessage();
  }

  private obtenerJugador(): void {
    this.jugadorService.obtenerJugador(this.roomId, this.idJugador).subscribe(
      (data) => {
        this.jugador = data;
        this.usuario.nombre = this.jugador.nombre;
        // Llamar a la función para pintar las cartas después de obtener el jugador
        this.pintarCartas();
      },
      (error) => {
        console.error('Error al obtener el jugador:', error);
      }
    );
  }
  getCarta() {
    this.roomService.getCarta(this.roomId).subscribe(
      (response) => {
        this.cartaMostrar = response;
      },
      (error) => {
        console.error('Error al obtener la carta', error);
      }
    );
  }

  private pintarCartas(): void {
    if (this.jugador && this.jugador.carton.cartasEnCarton) {
      for (const carta of this.jugador.carton.cartasEnCarton) {
        const card: Card = {
          id: carta.idCarta,
          title: carta.nombre,
          image: carta.rutaCarta,
        };
        this.tarjetas.push(card);
      }
    } else {
      console.error('El jugador no tiene cartas o el objeto jugador es nulo.');
    }
  }

  //metodo para enviar mensajes por el websocket
  sendMessage() {
    this.chatService.sendMessage(this.roomId);
  }

  //Método para escuchar las respuestas del servidor
  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((message: any) => {
      this.cartaMostrar = message;
      this.buttonDisabled = true; // Deshabilitar el botón

      // Habilitar el botón después de 2 segundos
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 2000); // 2 segundos en milisegundos
    });
  }

  //Operaciones con la tarjeta que se dio click
  onCartaClick(carta: Carta){
    if(carta.title==this.cartaMostrar.nombre){
      this.usuario.puntuacion+=1;//actualizamos el puntaje del jugador
    }
  }
}
