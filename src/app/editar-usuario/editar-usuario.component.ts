import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  lUsers: any[] = [
    { id: 1, Name: 'Administrador' },
    { id: 2, Name: 'Auxiliar'},
    { id: 3, Name: 'Consultor'}
];
  

  usuario:any={
    id:0,
    correo:"",
    contrasena:"",
    rol:0
  }


  constructor(private route: ActivatedRoute,private router:Router,private LoginService:LoginServiceService) { }

  ngOnInit(): void {
    let idUsuario = sessionStorage.getItem('idUsuario');
    console.log(idUsuario);
    this.LoginService
    .getUsuario(idUsuario)
    .subscribe((usuario: any[]) => this.usuario = usuario);
   // this.LoginService.getUsuario(idUsuario).subscribe((usuario) => this.usuario = usuario)
  }

  editarUsuario() {
    if(this.usuario.contra==""){
      Swal.fire('Atención','Proporcione contraseña' , 'info');
      return; 
    }
    if(this.usuario.rol==0){
      Swal.fire('Atención','Proporcione un rol' , 'info');
      return;
    }


    console.log(this.usuario);
    this.LoginService.updateUsuario(this.usuario).subscribe(() => {
      Swal.fire('Éxito','Usuario actualizado' , 'success'); 
      this.volver();
    })
  }

  volver() {
    this.router.navigate(['/tablaUsuarios']);
  }

}
