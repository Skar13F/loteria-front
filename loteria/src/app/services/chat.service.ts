import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client'; // Use default import
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root',
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

  /*joinRoom(roomId: string) {
    // Nos unimos a un grupo, room o servidor 
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
      });
    });
  }*/

  /*joinRoom(roomId: string, idJugador: string) {
    // Nos unimos a un grupo, room o servidor
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(
        `/topic/${roomId}/${idJugador}`,
        (messages: any) => {
          //el mensaje que se recibirá será de tipo carta
          const messageContent = JSON.parse(messages.body);
          console.log(messageContent);
        }
      );
    });
  }

  sendMessage(roomId: string, idJugador: string) {
    this.stompClient.send(`/app/tablero/${roomId}/${idJugador}`, {});
  }*/
  joinRoom(roomId: string, idJugador: string) {
    // Nos unimos a un grupo, room o servidor
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        //el mensaje que se recibirá será de tipo carta
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
      });
    });
  }

  sendMessage(roomId: string, idJugador: string) {
    this.stompClient.send(`/app/tablero/${roomId}`, {});
  }
}
