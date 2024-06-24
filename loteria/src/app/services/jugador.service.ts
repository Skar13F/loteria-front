import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private urlApiCrear="http://localhost:3000/api/jugadores";

  constructor(private http: HttpClient) { }

  createJugador(jugador: Jugador): Observable<Jugador> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Jugador>(this.urlApiCrear, jugador, { headers });
  }
}
