import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cad-usuarios',
  templateUrl: './cad-usuarios.component.html',
  styleUrls: ['./cad-usuarios.component.css']
})
export class CadUsuariosComponent implements OnInit {

  usuario: Usuario;
  success: boolean = false;
  errors: String[] = [];
  id?: number;

  constructor(
    private service: AuthService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getUsuarioById(this.id)
            .subscribe( 
              response => this.usuario = response ,
              errorResponse => this.usuario = new Usuario()
            )
        }
    })
  }

  onSubmit(){
    console.log(this.usuario)
    if(this.id){
      this.service
        .update(this.usuario)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
            this.service.getUsuarios();
            this.router.navigate(['/adm/user']);
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o usuario.']
        })

    }else{
      this.service
        .save(this.usuario)
          .subscribe( response => {
            console.log(this.usuario)
            this.success = true;
            this.errors = [];
            this.usuario = response;
            this.service.getUsuarios();
            this.router.navigate(['/adm/user']);
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
            console.log(this.errors)
          })
    }
    console.log(this.usuario)
  }

}
