import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';



  @Component({
    selector: 'app-convidado-form',
    templateUrl: './convidado-form.component.html',
    styleUrls: ['./convidado-form.component.css']
  })

  export class ConvidadoFormComponent implements OnInit {

    eventos: Evento[] = [];
  
    constructor(
      private eventoService:EventoService
    ) { }
  

    ngOnInit(): void {
      this.eventoService
      .getEventos()
      .subscribe( resposta => this.eventos = resposta);
    }
}
