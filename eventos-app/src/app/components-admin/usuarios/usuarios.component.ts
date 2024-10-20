import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  usuarioSelecionado: Usuario;
  mensagemSucesso?: string;
  mensagemErro?: string;
  ordem: string = '';
  ordemAscendente: boolean = true;

  p: number = 1;
  itensPorPagina: number = 10;
  sortDirection: boolean = true;
  currentSortField: string = '';

  filtros = {
    id: '',
    username: ''
  };


  constructor(
    private service: AuthService, 
    private router: Router
  ) { 
    this.usuarioSelecionado = new Usuario();
  }

  ngOnInit(): void {
    this.service
    .getUsuarios()
    .subscribe( resposta => {
        this.usuarios = resposta 
        this.usuariosFiltrados = resposta;
      });
  }

  filtrar() {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      return (this.filtros.id ? usuario.id!.toString().includes(this.filtros.id) : true) &&
             (this.filtros.username ? usuario.username!.toLowerCase().includes(this.filtros.username.toLowerCase()) : true)
    });
  }

  limparFiltros() {
    this.filtros = {
      id: '',
      username: ''
    };

    this.filtrar(); // Opcional: Chame a função filtrar para atualizar a lista de eventos filtrados 
  }

  preparaDelete(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  getUsuario(usuario: Usuario){
    this.usuarioSelecionado = usuario;
    alert(this.usuarioSelecionado)
  }

  deletar(){
    this.service
      .deleteUsuario(this.usuarioSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Usuario deletado com sucesso!'
          this.ngOnInit();
          this.service.getUsuarios();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuario.'  
      )
      window.location.reload();          
  }

  ordenar(campo: keyof Usuario) {
    this.ordem = campo;
    this.ordemAscendente = !this.ordemAscendente; // Alterna entre ascendente e descendente

    this.usuarios.sort((a, b) => {
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
