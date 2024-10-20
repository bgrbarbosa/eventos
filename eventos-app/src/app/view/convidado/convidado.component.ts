import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';
import { Convidado } from 'src/app/model/Convidado';

@Component({
  selector: 'app-convidado',
  templateUrl: './convidado.component.html',
  styleUrls: ['./convidado.component.css']
})
export class ConvidadoComponent implements OnInit {
  
  evento?: Evento[];
  descEvento?: string;
  cpf?: string;
  convidadoSearch?: Convidado;

  
  constructor(
    private convidadoService: ConvidadoServiceService,
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private router: Router 
  ) {
      this.evento = [];

   }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.eventoService
        .getEventoById(urlParams['id'])
        .subscribe(
          response => {
            this.evento?.push(response);
            this.descEvento = response.titleEvento;
          },
          errorResponse => this.evento = []
        )
    });
  }

  onSubmit(): void {
    this.onSearchConvidado();
  } 

  onSearchConvidado(){
    console.log(this.cpf)
    if (this.cpf != null) {
      this.convidadoService.getConvidadoCpf(this.cpf)
        .subscribe(
          response => {
            this.convidadoSearch = response;
            console.log(this.convidadoSearch)
            this.router.navigate(['/convidado/update', this.cpf, this.evento![0]!.idEvento!])
          },
          errorResponse => {
            this.convidadoSearch = new Convidado();
            console.log(this.convidadoSearch)
            this.router.navigate(['/convidado/create', this.cpf, this.evento![0]!.idEvento])
          } 
        ) 
    } 
  }

}

