import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Convidado } from 'src/app/model/Convidado';
import { Evento } from 'src/app/model/Evento';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';

@Component({
  selector: 'app-eventos-convidados',
  templateUrl: './eventos-convidados.component.html',
  styleUrls: ['./eventos-convidados.component.css']
})
export class EventosConvidadosComponent implements OnInit {

  
  convidado: Convidado;
  id?: number;
  
  ordem: string = '';
  ordemAscendente: boolean = true;
  p: number = 1;
  itensPorPagina: number = 1;
  sortDirection: boolean = true;
  currentSortField: string = '';

  eventosFiltrados?: Evento[] = [];

  eventos: Evento[] = [];


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
                this.convidado = response;
                this.eventosFiltrados = response.eventos;
                console.log("Convidado: ", this.convidado)
                console.log("Eventos: ", this.convidado.eventos)       
              },
              errorResponse => this.convidado = new Convidado()
            )
        }
    })
  }

  filtros = {
    idEvento: '',
    titleEvento: '',
    descEvento: '',
    dtEvento: '',
    hrEvento: '',
    busca: ''  // Novo campo de busca global
  };
  
  filtrar() {
    this.eventosFiltrados = this.convidado.eventos?.filter(evento => {
      return (this.filtros.idEvento ? evento.idEvento!.toString().includes(this.filtros.idEvento) : true) &&
             (this.filtros.titleEvento ? evento.titleEvento!.toLowerCase().includes(this.filtros.titleEvento.toLowerCase()) : true) &&
             (this.filtros.descEvento ? evento.descEvento === this.filtros.descEvento : true) &&
             (this.filtros.dtEvento ? evento.dtEvento === this.filtros.dtEvento : true) &&
             (this.filtros.hrEvento ? evento.hrEvento === this.filtros.hrEvento : true) &&
             // Filtro global
             (this.filtros.busca ? 
                (evento.titleEvento?.toLowerCase().includes(this.filtros.busca.toLowerCase()) || 
                evento.descEvento?.includes(this.filtros.busca) || 
                evento.dtEvento?.includes(this.filtros.busca) || 
                evento.hrEvento?.toLowerCase().includes(this.filtros.busca.toLowerCase()) || 
                evento.idEvento?.toString().includes(this.filtros.busca)) : true);
    });
  }

  limparFiltros() {
    this.filtros = {
      idEvento: '',
      titleEvento: '',
      descEvento: '',
      dtEvento: '',
      hrEvento: '',
      busca: '' 
    };

    this.filtrar(); // Opcional: Chame a função filtrar para atualizar a lista de eventos filtrados
  }

  ordenar(campo: keyof Evento) {
    this.ordem = campo;
    this.ordemAscendente = !this.ordemAscendente; // Alterna entre ascendente e descendente

    this.eventosFiltrados?.sort((a, b) => {
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
