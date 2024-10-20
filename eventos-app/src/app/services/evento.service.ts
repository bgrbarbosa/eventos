import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';
import { HttpClient } from '@angular/common/http';
import { Convidado } from '../model/Convidado';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  apiURL: string = 'http://localhost:8088/evento';

  constructor(
    private http: HttpClient
  ) { }

  getEventos():Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiURL);
  }

  getEventoById(id: number) : Observable<Evento> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  save( evento: Evento ) : Observable<Evento> {
    return this.http.post<Evento>( `${this.apiURL}` , evento);
  }

  update( evento: Evento ) : Observable<any> {
    return this.http.put<Evento>(`${this.apiURL}` , evento);
  }

  deleteEvento(evento: Evento) : Observable<any> {
    return this.http.delete<Evento>(`${this.apiURL}/${evento.idEvento}`);
  }

  getConvidadosByEvento(id: number) : Observable<Convidado> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

}
