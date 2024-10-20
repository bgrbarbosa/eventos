import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Convidado } from 'src/app/model/Convidado';
import { ConvidadosEventosComponent } from '../../eventos/evento-convidados/convidados-eventos.component';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';

@Component({
  selector: 'app-cad-convidados',
  templateUrl: './cad-convidados.component.html',
  styleUrls: ['./cad-convidados.component.css']
})

export class CadConvidadosComponent implements OnInit {

  convidado: Convidado;
  success: boolean = false;
  errors: String[] = [];
  id?: number;
  
  constructor(
    private service: ConvidadoServiceService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.convidado = new Convidado();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getConvidadoById(this.id)
            .subscribe( 
              response => {
                this.convidado = response
              } ,
              errorResponse => this.convidado = new Convidado()
            )
        }
    })
  }

  onSubmit(){
    console.log(this.convidado)
    if(this.id){
      this.service
        .updateConvidado(this.convidado)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
            this.router.navigate(['/adm/convidados']);
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o convidado.']
        })

    }else{
      this.service
        .saveConvidado(this.convidado)
          .subscribe( response => {
            this.success = true;
            this.errors = [];
            this.convidado = response;
            this.router.navigate(['/adm/convidados']);
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
            console.log(this.errors)
          })
    }
    console.log(this.convidado)
  }

}
