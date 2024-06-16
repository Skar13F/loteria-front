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

  initConnectionSocket() {
    const url = '//localhost:3000/loteria-websocket';
    const socket = new SockJS(url);
    //const socket = new WebSocket('ws://localhost:3000/loteria-websocket/');

    this.stompClient = Stomp.over(socket);  // Use Stomp.Client
  }

  joinRoom(roomId: string) {  // Accept roomId as an argument
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
