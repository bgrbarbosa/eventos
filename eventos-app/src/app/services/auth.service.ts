import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8088/user';
  tokenURL: string = 'http://localhost:8088/oauth/token'
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  save(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  getUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  deleteUsuario(usuario: Usuario) : Observable<any> {
    return this.http.delete<Usuario>(`${this.apiURL}/${usuario.id}`);
  }

  getUsuarioById(id: number) : Observable<Usuario> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  update( usuario: Usuario ) : Observable<any> {
    return this.http.put<Usuario>(`${this.apiURL}` , usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password')
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    console.log(this.tokenURL, params.toString(), {headers})
    return this.http.post( this.tokenURL, params.toString(), {headers});                    
  }

}
