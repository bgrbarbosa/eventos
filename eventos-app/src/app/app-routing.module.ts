import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ConvidadoComponent } from './view/convidado/convidado.component';
import { ConvidadoCreateComponent } from './components/convidado-create/convidado-create.component';
import { ConvidadoUpdateComponent } from './components/convidado-update/convidado-update.component';
import { ConvidadoFormComponent } from './components/convidado-form/convidado-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './view/home-admin/home-admin.component';
import { EventosComponent } from './components-admin/eventos/eventos.component';
import { ConvidadosComponent } from './components-admin/convidados/convidados.component';
import { CadEventosComponent } from './components-admin/eventos/cad-eventos/cad-eventos.component';
import { CadConvidadosComponent } from './components-admin/convidados/cad-convidados/cad-convidados.component';
import { ConvidadosEventosComponent } from './components-admin/eventos/evento-convidados/convidados-eventos.component';
import { EventosConvidadosComponent } from './components-admin/convidados/convidados-eventos/eventos-convidados.component';
import { UsuariosComponent } from './components-admin/usuarios/usuarios.component';
import { CadUsuariosComponent } from './components-admin/usuarios/cad-usuarios/cad-usuarios.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path : '' , component: HomeComponent, children:[
    { path: '' , redirectTo: '/home', pathMatch: 'full' },
    { path : 'home', component: ConvidadoFormComponent},
    { path : 'inscricao/:id' , component: ConvidadoComponent},
    { path: 'convidado/create/:cpf/:id', component: ConvidadoCreateComponent },
    { path: 'convidado/update/:cpf/:id', component: ConvidadoUpdateComponent },
    { path: 'login', component: LoginComponent },
    { path : 'adm' , component: HomeAdminComponent, canActivate : [AuthGuard],  children:[
      { path: '' , redirectTo: '/adm', pathMatch: 'full'},
      { path : 'eventos', component: EventosComponent, canActivate : [AuthGuard]},
      { path : 'cad-evento', component: CadEventosComponent, canActivate : [AuthGuard]},
      { path : 'cad-evento/:id', component: CadEventosComponent, canActivate : [AuthGuard]},
      { path : 'convidados', component: ConvidadosComponent, canActivate : [AuthGuard]},
      { path : 'cad-convidado/:id', component: CadConvidadosComponent, canActivate : [AuthGuard]},
      { path : 'user', component: UsuariosComponent, canActivate : [AuthGuard]},
      { path : 'cad-user', component: CadUsuariosComponent, canActivate : [AuthGuard]},
      { path : 'cad-user/:id', component: CadUsuariosComponent, canActivate : [AuthGuard]},
      { path : 'convidados-eventos/:id', component: ConvidadosEventosComponent, canActivate : [AuthGuard]},
      { path : 'eventos-convidados/:id', component: EventosConvidadosComponent, canActivate : [AuthGuard]}  
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
