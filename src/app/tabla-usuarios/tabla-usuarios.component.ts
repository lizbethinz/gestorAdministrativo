
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
declare var $: any
//import Swal from 'sweetalert2/dist/sweetalert2.js'; 




@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {
 
  
  public data = [
]; 
  title = 'angulardatatables';
  
  dtOptions: any = {};

  
  busqueda:string ="";
  
  /*  data: any[] = [
  ]; */
  


  constructor(private cdRef: ChangeDetectorRef,private router:Router,private LoginService:LoginServiceService) {
  
   }

  ngOnInit(): void {
    this.obtenerUsuarios();

  

 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
   $(document).on( 'click', '.getDetails', function () {
      $(".username").text("");
      $(".username").text($(this).parents("tr").find(".fname").text());
      jQuery('#myModal').show();
     //$("#myModal").modal('show');
  } );
  }

  obtenerUsuarios() {
    return this.LoginService
      .getUsuarios()
      .subscribe((data: any[]) => this.data = data);
      
  }

  eliminarUsuario(usuario ) {
   
           Swal
    .fire({
        title: "Eliminar",
        text: "Desea borrar el usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
          this.LoginService
          .borrarUsuario(usuario)
          .subscribe(() => {
            this.obtenerUsuarios();
            Swal.fire('Éxito','Se eliminó el usuario', 'success'); 
          });
        } else {
            // Dijeron que no
            console.log("*NO se elimina *");
        }
    });
          
      // }
  //  });

  }


  nuevoUsuario(){
    this.router.navigate(['/agregarusuario']);
  }

  editarUsuario(id){
    sessionStorage.setItem('idUsuario', id)
    this.router.navigate(['/usuarioEditar']);
  }

  buscarUsuarios(){
    let queesbusqueda=this.busqueda ;
    if(queesbusqueda.length < 3){
      Swal.fire('Atención','Proporcione al menos 3 carácteres' , 'info');
      return;
    }
    
    console.log(queesbusqueda);
    this.LoginService
    .BusquedaUsuario(queesbusqueda)
    .subscribe((usuario: any[]) =>{
      this.data = usuario
      console.log(this.data);
      if ( this.data.length <= 0) {
        Swal.fire('Atención','No existen datos con los filtros especificados' , 'info');
        // the array is defined and has at least one element
    }
    }
    );
 /*    this.LoginService
    .BusquedaUsuario(queesbusqueda)
    .subscribe((data: any[]) => (data: any[]) => {
      console.log(data);
      this.data = data;
      
    }) */
    

  }



}
