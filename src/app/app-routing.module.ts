import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes,RouterModule} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AgregarusuarioComponent } from './agregarusuario/agregarusuario.component';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import {EditarUsuarioComponent} from './editar-usuario/editar-usuario.component'
import { AgregarCategoriasComponent } from './agregar-categorias/agregar-categorias.component';
import { TablaCategoriasComponent } from './tabla-categorias/tabla-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { TablaEmpleadosComponent } from './tabla-empleados/tabla-empleados.component';
import { AgregarEmpleadosComponent } from './agregar-empleados/agregar-empleados.component';
import { EditarEmpleadosComponent } from './editar-empleados/editar-empleados.component';

const routes: Routes =[
  {path: 'menu', component: MenuComponent },
  {path: 'app', component: AppComponent },
  {path: '', component: LoginComponent },
  {path: 'agregarusuario', component: AgregarusuarioComponent },
  {path: 'tablaUsuarios', component: TablaUsuariosComponent },
  {path: 'usuarioEditar', component: EditarUsuarioComponent },
  {path: 'AgregarCategorias', component: AgregarCategoriasComponent },
  {path: 'TablaCategorias', component: TablaCategoriasComponent}
  ,{path: 'CategoriaEditar', component: EditarCategoriasComponent},
  {path:'TablaEmpleados',component:TablaEmpleadosComponent},
  {path:'agregarEmpleado',component:AgregarEmpleadosComponent},
  {path:'empleadoEditar',component:EditarEmpleadosComponent},
  
  
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }
