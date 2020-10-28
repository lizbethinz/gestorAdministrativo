import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginServiceService} from '../login-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {
  
  categoria:any={
    id:0,
    nombre:"",
    imagen:""
  }

  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombrecategoria:string="";
  public Nombreimagen="";
  public nombreimagensencillo="";
  public sehacargadoimg:boolean=false;

  constructor(private router:Router,private LoginService:LoginServiceService) { }

  ngOnInit(): void {
    let idCategoria = sessionStorage.getItem('idCategoria');
    console.log(idCategoria);
    this.LoginService
    .getCategoria(idCategoria)
    .subscribe((usuario: any[]) =>{
      this.categoria = usuario;
      this.Nombreimagen="http://localhost/Agricola/"+usuario['imagen'];
      this.nombreimagensencillo=usuario['imagen'];
    });

  }


  
  editarCategoria() {
    if(this.categoria.nombre==""){
      Swal.fire('Atención','Proporcione contraseña' , 'info');
      return; 
    }
    if(this.nombreimagensencillo==""){
      Swal.fire('Atención','Proporcione una imagen' , 'info');
      return;
    }


    console.log(this.categoria);
    var datoscat={
      id:this.categoria.id,
      nombre:this.categoria.nombre,
      imagen:this.nombreimagensencillo
    }

    this.LoginService.updateCategoria(datoscat).subscribe((datos) => {
      
      if(datos>= 1){
        Swal.fire('Éxito', 'Se actualizó la categoría', 'success'); 
        //alert("Se ha registrado el usuario");
        //window.GlobalVariable = datos;
        console.log(datos);
        this.volver();
        //sessionStorage.setItem('Rol', JSON.stringify(datos))
        //this.router.navigate(['/menu'])
      }else{
        Swal.fire('Error', 'No se pudo actualizar, compruebe que no sea un nombre repetido', 'warning'); 
        //alert("Nose registró el usuario, compruebe que todos los campos estén llenos y que no sea un usuario repetido");
      }
      //Swal.fire('Éxito','Se editó la categoría' , 'success'); 
  
    })
  }

  volver() {
    this.router.navigate(['/TablaCategorias']);
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
  

}
