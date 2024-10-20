import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-cad-eventos',
  templateUrl: './cad-eventos.component.html',
  styleUrls: ['./cad-eventos.component.css']
})
export class CadEventosComponent implements OnInit {

  evento: Evento;
  success: boolean = false;
  errors: String[] = [];
  id?: number;

  constructor(
    private service: EventoService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.evento = new Evento();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getEventoById(this.id)
            .subscribe( 
              response => {
                this.evento = response 
              },
              errorResponse => this.evento = new Evento()
            )
        }
    })
  }

  onSubmit(){
    console.log(this.evento)
    if(this.id){
      console.log("entrei no update")
      this.service
        .update(this.evento)
        .subscribe(response => {
            this.success = true;
            this.errors = [];
            this.router.navigate(['/adm/eventos']);
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.']
        })

    }else{
      this.service
        .save(this.evento)
          .subscribe( response => {
            this.success = true;
            this.errors = [];
            this.evento = response;
            this.router.navigate(['/adm/eventos']);
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
            console.log(this.errors)
          })
    }
    console.log(this.evento)
  }

}
