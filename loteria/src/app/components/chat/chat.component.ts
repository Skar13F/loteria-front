import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  //Datos provenientes del servidor
  roomData: any;
  roomList: any[] = [];

  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private service: RoomService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.chatService.joinRoom('ABC');

    // Recuperar los datos enviados desde el componente principal
    this.route.paramMap.subscribe((params) => {
      this.roomData = history.state.roomData;
      //this.roomList = history.state.roomList;
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
      message: this.messageInput,
      user: this.userId,
    } as ChatMessage; //creamos un objeto de tipo chat
    this.chatService.sendMessage('ABC', chatMessage);
    this.messageInput = '';
    this.router.navigate(['/tablero']);
  }
}
