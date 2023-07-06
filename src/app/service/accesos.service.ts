import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {
  private myAppUrl = 'http://localhost:3000/';
  private myApiUrl = 'clientes'

  
  constructor(private http: HttpClient) { }
  getAccesos(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  createCliente(nombre:any,pais:any,sistema:any): Observable<any> {
    var formData = new FormData();
    formData.append("nombre",nombre);
    formData.append("pais",pais);
    formData.append("sistema",sistema);
    return this.http.post(this.myAppUrl + this.myApiUrl,formData);
  }
  
  deleteCliente(id:any): Observable<any> {
    var formData = new FormData();
    formData.append("id",id);
    return this.http.post(this.myAppUrl + this.myApiUrl + '/delete',formData);
  }
  duplicateCliente(idOriginal:any,nombreNuevo:any,copiarUsuario:any): Observable<any> {
    var formData = new FormData();
    formData.append("nombreOriginal",idOriginal);
    formData.append("nombreNuevo",nombreNuevo);
    formData.append("copiarUsuarios",copiarUsuario);
    return this.http.post(this.myAppUrl + this.myApiUrl + '/duplicar',formData);
  }
}
