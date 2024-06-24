import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { JugadorService } from '../../services/jugador.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  roomData: any;
  roomList: any[] = [];

  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];
  jugador: any;
  //roomId: string='';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private service: RoomService,
    private jugadorService: JugadorService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.chatService.joinRoom('ABC');

    this.route.paramMap.subscribe((params) => {
      this.roomData = history.state.roomData;
      
    });

    this.listServers();
  }

  listServers() {
    this.service.getRooms().subscribe(
      (response) => {
        this.roomList = response;
        console.log(this.roomList);
      },
      (error) => {
        console.error('Error al obtener la lista de salas', error);
      }
    );
  }

  sendMessage() {
    const chatMessage = {
      roomId: this.messageInput,
      userId: this.userId,
    } as ChatMessage;

    this.chatService.sendMessage('ABC', chatMessage);
    this.messageInput = '';
  }

  conectarJugador(roomId: string): void {
    const jugador = {
      idJugador: '', // Dejar vacío si el backend lo genera
      nombre: this.messageInput,
      carton: {
        cartasEnCarton: [],
        matrizMarcado: [[]],
      },
      ganado: false,
    };

    this.jugadorService.createJugador(jugador).subscribe(
      (response) => {
        this.jugador = response; // Almacenar el jugador devuelto
        this.joinRoom(roomId, this.jugador); // Unirse a la sala después de crear el jugador
      },
      (error) => {
        console.error('Error al crear el jugador', error);
      }
    );
  }
  idJug:string='';
  idRoom:string='';
  joinRoom(roomId: string, jugador: any): void {
    this.roomService.joinRoom(roomId, jugador).subscribe(
      (response) => {
        console.log(`Jugador unido a la sala ${roomId}:`, response);
        console.log(
          'Cartas en el carton del jugador:',
          jugador.carton.cartasEnCarton
        );
        this.idJug=jugador.idJugador;
        this.idRoom=roomId;
        this.router.navigate(['/tablero',this.idRoom,this.idJug]);
      
      },
      (error) => {
        console.error(`Error al unir el jugador a la sala ${roomId}`, error);
      }
    );
  }
}
