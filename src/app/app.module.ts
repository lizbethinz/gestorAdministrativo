import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

import {LoginServiceService } from './login-service.service';
import { MenuComponent } from './menu/menu.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { TablaCategoriasComponent } from './tabla-categorias/tabla-categorias.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { TablaEmpleadosComponent } from './tabla-empleados/tabla-empleados.component';
import { AgregarEmpleadosComponent } from './agregar-empleados/agregar-empleados.component';
import { EditarEmpleadosComponent } from './editar-empleados/editar-empleados.component';






@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    AgregarusuarioComponent,
    TablaUsuariosComponent,
    EditarUsuarioComponent,
    AgregarCategoriasComponent,
    TablaCategoriasComponent,
    EditarCategoriasComponent,
    TablaEmpleadosComponent,
    AgregarEmpleadosComponent,
    EditarEmpleadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    DataTablesModule
  ],
  providers: [
    LoginServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
