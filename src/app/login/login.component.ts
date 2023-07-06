import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
form : FormGroup;
showError: boolean = false;


constructor(private toastr: ToastrService,
  private fb: FormBuilder,
  private _loginservice:LoginServiceService,
  private router: Router, 
  private route: ActivatedRoute) {
  this.form = this.fb.group({
    usuriano: [''],
    pasuriano: ['']
  })
}
logear(){
console.log(this.form.get('usuriano')?.value);
console.log(this.form.get('pasuriano')?.value);
this._loginservice.getLogin(this.form.get('usuriano')?.value,this.form.get('pasuriano')?.value).subscribe({
  next: (data) => {
    this.router.navigate(["clientes"]);
    console.log(data);
}, error:(error) => {
  this.showError =true;
  console.log(error);
  console.log('asd');
}})
}
}

