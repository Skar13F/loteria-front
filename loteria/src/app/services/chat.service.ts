import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // Use default import
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  constructor() { 
    this.initConnectionSocket();
  }
  //hacemos toda la conexión
  initConnectionSocket() {
    const url = 'http://localhost:3000/loteria-websocket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {  // Nos unimos a un grupo, room o servidor
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
      });
    });
  }

  sendMessage(roomId: string, chatMessage: ChatMessage){
    this.stompClient.send('/app/loteria-websocket/${roomId}', {},JSON.stringify(chatMessage));
  }
}
