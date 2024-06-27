import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private urlApiCrear="http://localhost:3000/api/salas/crear";
  private urlApiGet="http://localhost:3000/api/salas/disponible";
  private urlApiJoin="http://localhost:3000/api/salas/unirse";
  private urlApiCarta="http://localhost:3000/api/salas/carta";


  constructor(private http: HttpClient) { }

  createRoom(): Observable<any> {
    return this.http.post(this.urlApiCrear, {});  // Ajusta según sea necesario
  }

  getRooms(): Observable<any> {
    return this.http.get(this.urlApiGet, {})
  }

  joinRoom(roomId: string, jugador: Jugador): Observable<any> {
    const url = `${this.urlApiJoin}?salaId=${roomId}`;  // Usa salaId como esperado en el backend
    return this.http.post<any>(url, jugador);
  }
  getCarta(roomId:string): Observable<any>{
    const url = `${this.urlApiCarta}?salaId=${roomId}`;  // Usa salaId como esperado en el backend
    return this.http.get(url,{}); 
  }

}