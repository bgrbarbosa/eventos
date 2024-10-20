import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Convidado } from 'src/app/model/Convidado';
import { Evento } from 'src/app/model/Evento';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-convidado-create',
  templateUrl: './convidado-create.component.html',
  styleUrls: ['./convidado-create.component.css']
})
export class ConvidadoCreateComponent implements OnInit {

  id?: number;

  cpf?: string;
  convidado: Convidado;
  
  evento?: Evento[];  

  success: boolean = false;
  errors: String[] = [];

  eventoSearch?:Evento;

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
    this.activatedRoute.params.subscribe(params => {
    this.cpf = params['cpf'];
    this.id = params['id'];
    this.convidado.cpfConvidado = this.cpf;
    if (this.id) {
      this.eventoService
        .getEventoById(this.id)
        .subscribe(
          response => {
            this.evento?.push(response)
            this.convidado.eventos = this.evento;
          }
        )        
    }
      
    });
    this.onSearchEvento(); 
  }

  onSubmit() {    
    if (confirm("Deseja confirmar sua inscrição no evento?")){
      this.saveConvidado();      
    }
  }

  saveConvidado(){
    this.convidadoService
      .saveConvidado(this.convidado)
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
