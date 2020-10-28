import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  login={
    usuario:null,
    contrasena:null
  }

  constructor(private LoginService:LoginServiceService,private router:Router) { }
  loginUsuario(){
    sessionStorage.clear()
    this.LoginService.loginUsuario(this.login).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){

         // alert(datos['mensaje'])
          //window.GlobalVariable = datos;
          console.log(datos);
          var rol=datos['Mensaje'];
          sessionStorage.setItem('Rol', datos['mensaje'])
          this.router.navigate(['/menu'])
        }else{
          Swal.fire('Error',datos['mensaje'] , 'warning'); 
          //alert(datos['mensaje'])
        }
      }
    );
  }

 

}
