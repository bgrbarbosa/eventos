import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardEventosComponent } from './components/card-eventos/card-eventos.component';
import { HomeComponent } from './view/home/home.component';
import { HomeAdminComponent } from './view/home-admin/home-admin.component';
import { EventoService } from './services/evento.service';
import { ConvidadoFormComponent } from './components/convidado-form/convidado-form.component';
import { ConvidadoConsultaComponent } from './components/convidado-consulta/convidado-consulta.component';
import { ConvidadoComponent } from './view/convidado/convidado.component';
import { ConvidadoUpdateComponent } from './components/convidado-update/convidado-update.component';
import { ConvidadoCreateComponent } from './components/convidado-create/convidado-create.component';
import { MenuComponent } from './components-admin/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ConvidadosComponent } from './components-admin/convidados/convidados.component';
import { EventosComponent } from './components-admin/eventos/eventos.component';
import { CadEventosComponent } from './components-admin/eventos/cad-eventos/cad-eventos.component';
import { CadConvidadosComponent } from './components-admin/convidados/cad-convidados/cad-convidados.component';
import { ConvidadosEventosComponent } from './components-admin/eventos/evento-convidados/convidados-eventos.component';
import { EventosConvidadosComponent } from './components-admin/convidados/convidados-eventos/eventos-convidados.component';
import { UsuariosComponent } from './components-admin/usuarios/usuarios.component';
import { CadUsuariosComponent } from './components-admin/usuarios/cad-usuarios/cad-usuarios.component';
import { TokenInterceptor } from './token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardEventosComponent,
    HomeComponent,
    HomeAdminComponent,
    ConvidadoFormComponent,
    ConvidadoConsultaComponent,
    ConvidadoComponent,
    ConvidadoUpdateComponent,
    ConvidadoCreateComponent,
    MenuComponent,
    LoginComponent,
    ConvidadosComponent,
    EventosComponent,
    CadEventosComponent,
    CadConvidadosComponent,
    ConvidadosEventosComponent,
    EventosConvidadosComponent,
    UsuariosComponent,
    CadUsuariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    EventoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
