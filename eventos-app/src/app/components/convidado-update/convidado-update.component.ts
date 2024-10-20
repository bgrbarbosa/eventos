import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Convidado } from 'src/app/model/Convidado';
import { Evento } from 'src/app/model/Evento';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-convidado-update',
  templateUrl: './convidado-update.component.html',
  styleUrls: ['./convidado-update.component.css']
})
export class ConvidadoUpdateComponent implements OnInit {

  id?: number;

  cpf?: string;
  convidado: Convidado;
  
  evento?: Evento[];
  eventoSearch?:Evento;  

  success: boolean = false;
  errors: String[] = [];


  constructor(
    private eventoService: EventoService,
    private convidadoService: ConvidadoServiceService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { 
    this.evento = []
    this.convidado = new Convidado();
    this.eventoSearch = new Evento();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.cpf = params['cpf'];
      this.id = params['id'];
      if (this.cpf) {
        this.convidadoService
          .getConvidadoCpf(this.cpf)
          .subscribe(
            response => this.convidado = response
          )  
      }

      if (this.id) {
        this.eventoService
          .getEventoById(this.id)
          .subscribe(
            response => this.convidado.eventos?.push(response)
          )
      }
    })
    this.onSearchEvento(); 
   
  }

  onSubmit(){
    if (confirm("Deseja confirmar sua inscrição no evento?")){
      this.updateConvidado();      
    }
  }

  updateConvidado(){
    console.log("Convidado: ", this.convidado)
    this.convidadoService
      .updateConvidado(this.convidado)
      .subscribe(
        response => {
          this.success = true;
          this.errors = [],
          this.convidado = response;
          this.router.navigate(['/']);
        },
        errorResponse => {
          this.success = false;
          this.errors = [];
          if (errorResponse.error && Array.isArray(errorResponse.error.errors)) {
            this.errors = errorResponse.error.errors;
          } else if (errorResponse.error && typeof errorResponse.error.message === 'string') {
            this.errors.push(errorResponse.error.message); 
          } else {
            this.errors.push('Ocorreu um erro inesperado. Tente novamente mais tarde.');
          }
        }
      )
  }

  onSearchEvento() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
        if (this.id) {
          this.eventoService
            .getEventoById(this.id)
            .subscribe( response => 
              {
                this.eventoSearch = response
              },
              errorResponse => {
                this.errors = errorResponse
              }  
            )
        }
    })
  }

}
