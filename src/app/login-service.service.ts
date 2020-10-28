import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  URL="http://localhost/Agricola/";

  constructor(private http:HttpClient) { }

  loginUsuario(login){
    return this.http.post(`${this.URL}login.php`,JSON.stringify(login));
  }

  guardarUsuario(guardar){
    return this.http.post(`${this.URL}guardarUsuario.php`,JSON.stringify(guardar));
  }

  getUsuarios() {
    return this.http.get(`${this.URL}/getUsuarios.php`);
  }

  borrarUsuario(usuario) {
    return this.http.delete(`${this.URL}/borrarUsuario.php?id=${usuario}`);
  }

  getUsuario(id: string | number){
    return this.http.get(`${this.URL}/getUsuario.php?idUsuario=${id}`);
  }

  updateUsuario(usuario){
    return this.http.put(`${this.URL}/updateUsuario.php`, usuario);
  }

  BusquedaUsuario(busqueda: string){
    return this.http.get(`${this.URL}/BusquedaUsuario.php?busqueda=${busqueda}`);
  }
  

  public postFileImagen(imagenParaSubir: File){

		const formData = new FormData(); 
		formData.append('imagenPropia', imagenParaSubir); 
		return this.http.post(`${this.URL}/cargarimagen.php`, formData);

  }
  
  guardarCategoria(guardar){
    return this.http.post(`${this.URL}guardarCategoria.php`,JSON.stringify(guardar));
  }

  getCategorias() {
    return this.http.get(`${this.URL}/getCategorias.php`);
  }

  getCategoria(id: string | number) {
    return this.http.get(`${this.URL}/getCategoria.php?id=${id}`);
  }

  borrarCategoria(id){
    return this.http.delete(`${this.URL}/borrarCategoria.php?id=${id}`);
    //return this.http.post(`${this.URL}borrarCategoria.php`,JSON.stringify(id));
  }

  BorrarImagen(borrar: string){
    return this.http.get(`${this.URL}/borrarImagen.php?id=${borrar}`);
  }

  borrarCatImg(id){
    return this.http.post(`${this.URL}borrarCategoria.php`,JSON.stringify(id));
    //return this.http.post(`${this.URL}borrarCategoria.php`,JSON.stringify(id));
  }

  BusquedaCategoria(busqueda: string){
    return this.http.get(`${this.URL}/busquedaCategoria.php?busqueda=${busqueda}`);
  }
  updateCategoria(categoria){
    return this.http.put(`${this.URL}/updateCategoria.php`, categoria);
  }

  guardarEmpleado(guardar){
    return this.http.post(`${this.URL}guardarEmpleado.php`,JSON.stringify(guardar));
  }
  getEmpleados() {
    return this.http.get(`${this.URL}/getEmpleados.php`);
  }

  getEmpleado(id: string | number) {
    return this.http.get(`${this.URL}/getEmpleado.php?id=${id}`);
  }

  borrarEmpleado(id){
    return this.http.delete(`${this.URL}/borrarEmpleado.php?id=${id}`);
    //return this.http.post(`${this.URL}borrarCategoria.php`,JSON.stringify(id));
  }

  BusquedaEmpleado(busqueda: string){
    return this.http.get(`${this.URL}/busquedaEmpleado.php?busqueda=${busqueda}`);
  }
  updateEmpleado(update){
    return this.http.put(`${this.URL}/updateEmpleado.php`, update);
  }
}
