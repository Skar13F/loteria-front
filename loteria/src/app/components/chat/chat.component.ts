import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  userId: string="";
  messageList: any[]=[];
  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId=this.route.snapshot.params["userId"];
    this.chatService.joinRoom('ABC');
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
    } as ChatMessage;//creamos un objeto de tipo chat
    this.chatService.sendMessage('ABC', chatMessage);
    this.messageInput=""; 
    this.router.navigate(['/tablero']);

  }
}
