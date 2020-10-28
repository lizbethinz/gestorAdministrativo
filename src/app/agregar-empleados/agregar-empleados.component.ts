import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../login-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-agregar-empleados',
  templateUrl: './agregar-empleados.component.html',
  styleUrls: ['./agregar-empleados.component.css']
})
export class AgregarEmpleadosComponent implements OnInit {

  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombreempleado:string="";
  public Nombreimagen="";
  public nombreimagensencillo="";
  public sehacargadoimg:boolean=false;

  constructor(private router:Router,private LoginService:LoginServiceService) { }

  ngOnInit(): void {
  }

  
  public cargandoImagen(files: FileList){

		this.LoginService.postFileImagen(files[0]).subscribe(

			response => {
				this.respuestaImagenEnviada = response; 
				if(this.respuestaImagenEnviada <= 1){
          console.log("Error en el servidor"); 
          Swal.fire('Error', 'No se puede subir la imagen', 'warning'); 
				}else{

					if(this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){
            //Swal.fire('Éxito', 'Se registró la categoría', 'success'); 
            this.resultadoCarga = 1;
            console.log(this.respuestaImagenEnviada.msj);
            this.nombreimagensencillo=this.respuestaImagenEnviada.msj;
            this.Nombreimagen="http://localhost/Agricola/"+this.respuestaImagenEnviada.msj;
            this.sehacargadoimg=true;
            console.log(this.Nombreimagen);
            console.log(this.sehacargadoimg);

					}else{
            Swal.fire('Error', this.respuestaImagenEnviada.msj , 'warning'); 
						this.resultadoCarga = 2;
					}

				}
			},
			error => {
				console.log(<any>error);
			}

		);//FIN DE METODO SUBSCRIBE
    //this.files[];
  }
  
  volver() {
    this.router.navigate(['/TablaEmpleados']);
  }

  GuardarCategoria(){
    if(this.nombreempleado==""){
      Swal.fire('Atención','Proporcione un nombre para la categoría' , 'info');
      return; 
    }
    if(this.nombreimagensencillo==""){
      Swal.fire('Atención','Proporcione una imagen' , 'info');
      return; 
    }

    var datosemp={
      nombre:this.nombreempleado,
      img:this.nombreimagensencillo
    }

    this.LoginService.guardarEmpleado(datosemp).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          Swal.fire('Éxito', 'Se ha guardado el empleado', 'success'); 
          //alert("Se ha registrado el usuario");
          //window.GlobalVariable = datos;
          console.log(datos);
          this.volver();
          //sessionStorage.setItem('Rol', JSON.stringify(datos))
          //this.router.navigate(['/menu'])
        }else{
          Swal.fire('Error', 'No se registró el empleado, compruebe que no tenga nombre repetido', 'warning'); 
          //alert("Nose registró el usuario, compruebe que todos los campos estén llenos y que no sea un usuario repetido");
        }
      }
    );

  }


}
