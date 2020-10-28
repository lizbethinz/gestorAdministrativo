import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-tabla-empleados',
  templateUrl: './tabla-empleados.component.html',
  styleUrls: ['./tabla-empleados.component.css']
})
export class TablaEmpleadosComponent implements OnInit {

  public data = [
  ];
  busqueda:string ="";
  rol:string;

emp:any={
    imagen:"",
    id:0,
    nombre:""
  }

  constructor(private router:Router,private LoginService:LoginServiceService) { }

  ngOnInit(): void {
    this.rol=sessionStorage.getItem('Rol');
    this.obtenerEmpleados();
  }

  nuevoEmp(){
    this.router.navigate(['/agregarEmpleado']);
  }

  obtenerEmpleados() {
    return this.LoginService
      .getEmpleados()
      .subscribe((data: any[]) =>{
        this.data = data;
        console.log(data);
        console.log(this.data);
      } );
      
  }
  buscarEmpleados(){
    let queesbusqueda=this.busqueda ;
    if(queesbusqueda.length < 3){
      Swal.fire('Atención','Proporcione al menos 3 carácteres' , 'info');
      return;
    }
    
    console.log(queesbusqueda);
    this.LoginService
    .BusquedaEmpleado(queesbusqueda)
    .subscribe((usuario: any[]) =>{
      this.data = usuario
      console.log(this.data);
      if ( this.data.length <= 0) {
        Swal.fire('Atención','No existen datos con los filtros especificados' , 'info');
        // the array is defined and has at least one element
    }
    }
    );
    
  }

  eliminarEmp(id) {
    
    Swal
.fire({
 title: "Eliminar",
 text: "Desea borrar el empleado?",
 icon: 'warning',
 showCancelButton: true,
 confirmButtonText: "Sí",
 cancelButtonText: "Cancelar",
})
.then(resultado => {
 if (resultado.value) {
  this.LoginService
  .getEmpleado(id)
  .subscribe((emp: any[]) => {
    this.emp = emp
    console.log(this.emp);
    this.LoginService
  .BorrarImagen(this.emp.imagen)
  .subscribe((cat: any[]) => {
    this.emp = cat
    console.log(this.emp);
    //this.obtenerCategorias();
    //Swal.fire('Éxito','Se eliminó la categoría', 'success'); 
  }); 
  });
 
  
   this.LoginService
   .borrarEmpleado(id)
   .subscribe(() => {
     this.obtenerEmpleados();
     Swal.fire('Éxito','Se eliminó la categoría', 'success'); 
   });
 } else {
     // Dijeron que no
     console.log("*NO se elimina *");
 }
});
   
// }
//  });

}
  editarEmp(id){
    sessionStorage.setItem('idEmpleado', id)
    this.router.navigate(['/empleadoEditar']);
  }

}
