import { Component, OnInit, Input } from '@angular/core';
import { Evento } from 'src/app/model/Evento';

@Component({
  selector: 'app-card-eventos',
  templateUrl: './card-eventos.component.html',
  styleUrls: ['./card-eventos.component.css']
})
export class CardEventosComponent implements OnInit {
  
  @Input() evento!  : Evento;
 
  constructor() { }

  ngOnInit(): void {
  }


}
