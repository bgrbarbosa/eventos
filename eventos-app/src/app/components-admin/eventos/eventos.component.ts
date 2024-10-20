import { Component, OnInit } from '@angular/core';

import { Evento } from '../../model/Evento';
import { EventoService } from '../../services/evento.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  eventoSelecionado: Evento;
  mensagemSucesso?: string;
  mensagemErro?: string;

  ordem: string = '';
  ordemAscendente: boolean = true;
  p: number = 1;
  itensPorPagina: number = 10;
  sortDirection: boolean = true;
  currentSortField: string = '';

  filtros = {
    idEvento: '',
    titleEvento: '',
    dtEvento: '',
    hrEvento: ''
  };

  constructor(
    private service: EventoService,
    private router: Router
  ) {
    this.eventoSelecionado = new Evento();
  }

  ngOnInit(): void {
    this.service
      .getEventos()
      .subscribe( resposta => {
          this.eventos = resposta
          this.eventosFiltrados = resposta;
        });
  }

  filtrar() {
    this.eventosFiltrados = this.eventos.filter(evento => {
      return (this.filtros.idEvento ? evento.idEvento!.toString().includes(this.filtros.idEvento) : true) &&
             (this.filtros.titleEvento ? evento.titleEvento!.toLowerCase().includes(this.filtros.titleEvento.toLowerCase()) : true) &&
             (this.filtros.dtEvento ? evento.dtEvento === this.filtros.dtEvento : true) &&
             (this.filtros.hrEvento ? evento.hrEvento === this.filtros.hrEvento : true);
    });
  }

  limparFiltros() {
    this.filtros = {
        idEvento: '',
        titleEvento: '',
        dtEvento: '',
        hrEvento: ''
    };

    this.filtrar(); // Opcional: Chame a função filtrar para atualizar a lista de eventos filtrados
  }

  preparaDelete(evento: Evento){
    this.eventoSelecionado = evento;
  }


  deletar(){ 
      console.log(this.eventoSelecionado)  
      this.service
      .deleteEvento(this.eventoSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Cliente deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
      )
      window.location.reload();
    }
   
 

  ordenar(campo: keyof Evento) {
    this.ordem = campo;
    this.ordemAscendente = !this.ordemAscendente; // Alterna entre ascendente e descendente

    this.eventos.sort((a, b) => {
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
