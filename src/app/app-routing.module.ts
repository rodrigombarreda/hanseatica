import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesosComponent } from './accesos/accesos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'clientes',component: AccesosComponent},
  { path:'',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
