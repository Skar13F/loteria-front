import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client'; // Use default import
import { Carta } from '../models/jugador';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<Carta | null> = new BehaviorSubject<Carta | null>(null);//Este mensaje es lo que se recibe del back
  constructor() {
    this.initConnectionSocket();
  }

  //hacemos toda la conexión
  initConnectionSocket() {
    const url = 'http://localhost:3000/loteria-websocket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {
    // Nos unimos a un grupo, room o servidor
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        //el mensaje que se recibirá será de tipo carta
        const messageContent = JSON.parse(messages.body);
        const currentMessage=this.messageSubject.getValue();
        this.messageSubject.next(messageContent);
      });
    });
  }

  sendMessage(roomId: string) {
    this.stompClient.send(`/app/tablero/${roomId}`, {});
  }

  getMessageSubject(){//para que podamos llamar al mensaje obtenido del sercidor desde otro componente
    return this.messageSubject.asObservable();
  }
}
