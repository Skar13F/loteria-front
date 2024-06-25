import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  public room: any;
  //public rooms: any[]=[];

  constructor(private service: RoomService, private router: Router) {}

  ngOnInit(): void {
    // Puedes inicializar cualquier cosa que necesites aquí
  }

  createServer() {
    this.service.createRoom().subscribe(
      (response) => {
        this.room = response;
        console.log(this.room);
        //this.router.navigate(['/unirse']);
        this.router.navigate(['/unirse'], { state: { roomData: this.room } });

      },
      (error) => {
        console.error('Error al crear la sala', error);
      }
    );
  }
  listServers(){
    this.router.navigate(['/unirse'], { state: { roomData: this.room } });

  }

  /*listServers(){
    this.service.getRooms().subscribe(
      (response)=>{
        this.rooms = response;
        console.log(this.rooms);
        //this.router.navigate(['/unirse']);
        this.router.navigate(['/unirse'], { state: { roomList: this.rooms } });

      },
      (error) => {
        console.error('Error al tratar de encontrar las salas', error);
      }
    );
  }*/
}
