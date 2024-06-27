import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { RoomService } from '../../services/room.service';

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

  jugadorName: string = '';
  messageList: any[] = [];
  jugador: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RoomService,
    private jugadorService: JugadorService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.idJug = this.route.snapshot.queryParams['idJugador'];
    this.route.paramMap.subscribe((params) => {
      this.roomData = history.state.roomData;
    });

    this.listServers();
  }

  listServers() {
    this.service.getRooms().subscribe(
      (response) => {
        this.roomList = response;
      },
      (error) => {
        console.error('Error al obtener la lista de salas', error);
      }
    );
  }

  

  conectarJugador(roomId: string): void {
    const jugador = {
      idJugador: '', // Dejar vacío si el backend lo genera
      nombre: this.jugadorName,
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
        this.idJug=jugador.idJugador;
        this.idRoom=roomId;

        this.router.navigate(['/tablero',this.idRoom], {
          queryParams: { idJugador: this.idJug}
        });
      
      },
      (error) => {
        console.error(`Error al unir el jugador a la sala ${roomId}`, error);
      }
    );
  }
  gotoHome(){
    this.router.navigate(['/']);
  }
}
