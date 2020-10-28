import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-agregarusuario',
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent {

  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string  = '1';
  verSeleccion: string        = '';


  lUsers: any[] = [
    { id: 1, Name: 'Administrador' },
    { id: 2, Name: 'Auxiliar'},
    { id: 3, Name: 'Consultor'}
];
curUser: any = this.lUsers[0]; // first will be selected by default by browser

  usuario={
    correo:"",
    contrasena:"",
    rol:0
  }

  constructor(private router:Router,private LoginService:LoginServiceService) { 
    this.datos = [1,2,3,4,5,6,7,8,9,10];
  }

  

setNewUser(id: any): void {
  console.log(id);
  this.opcionSeleccionado=id;
  console.log(this.opcionSeleccionado);
  // Match the selected ID with the ID's in array
  this.curUser = this.lUsers.filter(value => value.id === parseInt(id));
  console.log(this.curUser);
}

guardarUsuario() {
  if(this.usuario.correo==""){
    Swal.fire('Atención', 'Proporcione un correo', 'info'); 
    return;
  }
  if(this.usuario.contrasena==""){
    Swal.fire('Atención', 'Proporcione una contraseña', 'info'); 
    return;
  }
  if(this.usuario.rol==0){
    Swal.fire('Atención', 'Proporcione un rol', 'info'); 
    return;
  }
  console.log(this.usuario);
  this.LoginService.guardarUsuario(this.usuario).subscribe(
    datos=>{
      if(datos['resultado']=='OK'){
        Swal.fire('Éxito', 'Se ha registrado el usuario', 'success'); 
        //alert("Se ha registrado el usuario");
        //window.GlobalVariable = datos;
        console.log(datos);
        this.volver();
        //sessionStorage.setItem('Rol', JSON.stringify(datos))
        //this.router.navigate(['/menu'])
      }else{
        Swal.fire('Error', 'No se registró el usuario, compruebe que no sea un usuario repetido', 'warning'); 
        //alert("Nose registró el usuario, compruebe que todos los campos estén llenos y que no sea un usuario repetido");
      }
    }
  );
}

volver() {
  this.router.navigate(['/tablaUsuarios']);
}

  

}
