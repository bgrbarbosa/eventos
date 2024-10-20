import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-convidado-consulta',
  templateUrl: './convidado-consulta.component.html',
  styleUrls: ['./convidado-consulta.component.css']
})
export class ConvidadoConsultaComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    
  }

  onSubmit() {    
  
  }          

}
