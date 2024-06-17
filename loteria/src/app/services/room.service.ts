import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private urlApi="http://localhost:3000/api/rooms/create";

  constructor(private http: HttpClient) { }

  createRoom(): Observable<any> {
    return this.http.post(this.urlApi, {});  // Ajusta según sea necesario
  }
}