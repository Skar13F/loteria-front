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

  constructor(private service: RoomService, private router: Router) {}

  ngOnInit(): void {
    // Puedes inicializar cualquier cosa que necesites aquí
  }

  createServer() {
    this.service.createRoom().subscribe(
      (response) => {
        this.room = response;
        console.log(this.room);
        this.router.navigate(['/unirse']);
      },
      (error) => {
        console.error('Error al crear la sala', error);
      }
    );
  }
}
