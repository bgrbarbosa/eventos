import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Convidado } from '../model/Convidado';

@Injectable({
  providedIn: 'root'
})
export class ConvidadoServiceService {

  apiURL: string = 'http://localhost:8088/convidado';


  constructor(
    private http: HttpClient
  ) { }

  getConvidado():Observable<Convidado[]> {
    return this.http.get<Convidado[]>(this.apiURL);
  }

  getConvidadoCpf(cpf: string) : Observable<Convidado> {
    return this.http.get(`${this.apiURL}/cpf/${cpf}`);
  }

  getConvidadoById(id: number) : Observable<Convidado> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  saveConvidado( convidado: Convidado ) : Observable<Convidado> {
    return this.http.post<Convidado>( `${this.apiURL}` , convidado);
  }

  updateConvidado( convidado: Convidado ) : Observable<Convidado> {
    return this.http.put<Convidado>( `${this.apiURL}` , convidado);
  }

  deleteEvento(convidado: Convidado) : Observable<any> {
    return this.http.delete<Convidado>(`${this.apiURL}/${convidado.idConvidado}`);
  }

}
