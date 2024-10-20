import { Component, OnInit } from '@angular/core';


import { Convidado } from '../../model/Convidado';
import { ConvidadoServiceService } from 'src/app/services/convidado-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.component.html',
  styleUrls: ['./convidados.component.css']
})
export class ConvidadosComponent implements OnInit {

  convidados: Convidado[] = [];
  convidadosFiltrados: Convidado[] = [];
  convidadoSelecionado: Convidado;
  mensagemSucesso?: string;
  mensagemErro?: string;
  ordem: string = '';
  ordemAscendente: boolean = true;

  p: number = 1;
  itensPorPagina: number = 10;
  sortDirection: boolean = true;
  currentSortField: string = '';

  filtros = {
    idConvidado: '',
    nomeConvidado: '',
    cpfConvidado: '',
    telConvidado:'',
    emailConvidado:'',
    eventos:[]
  };

  constructor(
    private service: ConvidadoServiceService, 
    private router: Router
  ) 
    {
    this.convidadoSelecionado = new Convidado();
   }

  ngOnInit(): void {
    this.service
    .getConvidado()
    .subscribe( resposta => {
        this.convidados = resposta 
        this.convidadosFiltrados = resposta;
      });
  }

  filtrar() {
    this.convidadosFiltrados = this.convidados.filter(convidado => {
      return (this.filtros.idConvidado ? convidado.idConvidado!.toString().includes(this.filtros.idConvidado) : true) &&
             (this.filtros.nomeConvidado ? convidado.nomeConvidado!.toLowerCase().includes(this.filtros.nomeConvidado.toLowerCase()) : true) &&
             (this.filtros.cpfConvidado ? convidado.cpfConvidado === this.filtros.cpfConvidado : true);
             (this.filtros.emailConvidado ? convidado.emailConvidado === this.filtros.emailConvidado : true);
             (this.filtros.telConvidado ? convidado.telConvidado === this.filtros.telConvidado : true);
    });
  }

  limparFiltros() {
    this.filtros = {
      idConvidado: '',
      nomeConvidado: '',
      cpfConvidado: '',
      telConvidado:'',
      emailConvidado:'',
      eventos:[]
    };

    this.filtrar(); // Opcional: Chame a função filtrar para atualizar a lista de eventos filtrados 
  }

  preparaDelete(convidado: Convidado){
    this.convidadoSelecionado = convidado;
  }

  getConvidadosEventos(convidado: Convidado){
    this.convidadoSelecionado = convidado;
    alert(this.convidadoSelecionado)
  }

  deletar(){
    this.service
      .deleteEvento(this.convidadoSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Cliente deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'  
      )
      window.location.reload();    
  }

  ordenar(campo: keyof Convidado) {
    this.ordem = campo;
    this.ordemAscendente = !this.ordemAscendente; // Alterna entre ascendente e descendente

    this.convidados.sort((a, b) => {
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
