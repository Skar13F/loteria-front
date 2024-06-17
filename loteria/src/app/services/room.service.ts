import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private urlApiCrear="http://localhost:3000/api/rooms/create";
  private urlApiGet="http://localhost:3000/api/rooms/available";

  constructor(private http: HttpClient) { }

  createRoom(): Observable<any> {
    return this.http.post(this.urlApiCrear, {});  // Ajusta según sea necesario
  }

  getRooms(): Observable<any> {
    return this.http.get(this.urlApiGet, {})
  }
}