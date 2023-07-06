import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private myAppUrl = 'http://localhost:3000/';
  private myApiUrl = 'login'
  constructor(private http: HttpClient) { }

  
  getLogin(user:any,pass:any): Observable<any> {
    var formData = new FormData();
    formData.append("username",user);
    formData.append("password",pass);
    console.log(user);
    console.log(pass);
    console.log(this.myAppUrl + this.myApiUrl,formData);
    return this.http.post(this.myAppUrl + this.myApiUrl,formData);
  }
}
