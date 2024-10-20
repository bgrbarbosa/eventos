import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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
