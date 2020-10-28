import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  esadmin:boolean;
  rol:string;

  constructor(private router:Router,private logincomponent:LoginServiceService) { 
  
  }


  inciarSesion(){
    this.router.navigate(['/']);
  }
  

  ngOnInit(): void {
    this.esadmin=false;
    this.rol=sessionStorage.getItem('Rol');
    console.log(this.rol);
    if(sessionStorage.getItem('Rol')=='1'){
      console.log("el rol es admin");
    }

    if(this.rol==="1"){
      console.log("es admin");
    }else{
      console.log("no es admin");
    }
  };

  
}
