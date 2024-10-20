import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Convidado } from 'src/app/model/Convidado';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-convidados-eventos',
  templateUrl: './convidados-eventos.component.html',
  styleUrls: ['./convidados-eventos.component.css']
})
export class ConvidadosEventosComponent implements OnInit {

  evento: Evento;
  id?: number;
  
  ordem: string = '';
  ordemAscendente: boolean = true;
  sortDirection: boolean = true;
  currentSortField: string = '';
  
  p: number = 1;
  itensPorPagina: number = 1;


  convidadosFiltrados?: Convidado[] = [];

  convidados: Convidado[] = [];

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
                this.evento = response;
                this.convidadosFiltrados = response.convidados;       
              }
            )
        }
    })
  }



  filtros = {
    idConvidado: '',
    nomeConvidado: '',
    cpfConvidado: '',
    telConvidado: '',
    emailConvidado: '',
    busca: ''  // Novo campo de busca global
  };
  
  filtrar() {
    this.convidadosFiltrados = this.evento.convidados?.filter(convidado => {
      return (this.filtros.idConvidado ? convidado.idConvidado!.toString().includes(this.filtros.idConvidado) : true) &&
             (this.filtros.nomeConvidado ? convidado.nomeConvidado!.toLowerCase().includes(this.filtros.nomeConvidado.toLowerCase()) : true) &&
             (this.filtros.cpfConvidado ? convidado.cpfConvidado === this.filtros.cpfConvidado : true) &&
             (this.filtros.telConvidado ? convidado.telConvidado === this.filtros.telConvidado : true) &&
             (this.filtros.emailConvidado ? convidado.emailConvidado === this.filtros.emailConvidado : true) &&
             // Filtro global
             (this.filtros.busca ? 
                (convidado.nomeConvidado?.toLowerCase().includes(this.filtros.busca.toLowerCase()) || 
                 convidado.cpfConvidado?.includes(this.filtros.busca) || 
                 convidado.telConvidado?.includes(this.filtros.busca) || 
                 convidado.emailConvidado?.toLowerCase().includes(this.filtros.busca.toLowerCase()) || 
                 convidado.idConvidado?.toString().includes(this.filtros.busca)) : true);
    });
  }

  limparFiltros() {
    this.filtros = {
      idConvidado: '',
      nomeConvidado: '',
      cpfConvidado: '',
      telConvidado: '',
      emailConvidado: '',
      busca: '' 
    };

    this.filtrar();
  }

  ordenar(campo: keyof Convidado) {
    this.ordem = campo;
    this.ordemAscendente = !this.ordemAscendente;

    this.convidadosFiltrados?.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA! < valorB!) {
        return this.ordemAscendente ? -1 : 1;
      }
      if (valorA! > valorB!) {
        return this.ordemAscendente ? 1 : -1;
      }
      return 0;
    });
  }

}
