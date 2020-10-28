import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.css']
})
export class TablaCategoriasComponent implements OnInit {

  public data = [
  ];
  busqueda:string ="";
  rol:string;

cat:any={
    imagen:"",
    id:0,
    nombre:""
  }
  constructor(private router:Router,private LoginService:LoginServiceService) { }

  ngOnInit(): void {
    this.rol=sessionStorage.getItem('Rol');
    this.obtenerCategorias();
  }

  nuevaCateg(){
    this.router.navigate(['/AgregarCategorias']);
  }

  obtenerCategorias() {
    return this.LoginService
      .getCategorias()
      .subscribe((data: any[]) =>{
        this.data = data;
        console.log(data);
        console.log(this.data);
      } );
      
  }
  buscarCategorias(){
    let queesbusqueda=this.busqueda ;
    if(queesbusqueda.length < 3){
      Swal.fire('Atención','Proporcione al menos 3 carácteres' , 'info');
      return;
    }
    
    console.log(queesbusqueda);
    this.LoginService
    .BusquedaCategoria(queesbusqueda)
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

  eliminarCat(id) {
    
    Swal
.fire({
 title: "Eliminar",
 text: "Desea borrar la categoría?",
 icon: 'warning',
 showCancelButton: true,
 confirmButtonText: "Sí",
 cancelButtonText: "Cancelar",
})
.then(resultado => {
 if (resultado.value) {
  this.LoginService
  .getCategoria(id)
  .subscribe((cat: any[]) => {
    this.cat = cat
    console.log(this.cat);
    this.LoginService
  .BorrarImagen(this.cat.imagen)
  .subscribe((cat: any[]) => {
    this.cat = cat
    console.log(this.cat);
    //this.obtenerCategorias();
    //Swal.fire('Éxito','Se eliminó la categoría', 'success'); 
  }); 
  });
 
  
   this.LoginService
   .borrarCategoria(id)
   .subscribe(() => {
     this.obtenerCategorias();
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
  editarCat(id){
    sessionStorage.setItem('idCategoria', id)
    this.router.navigate(['/CategoriaEditar']);
  }

}
