import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {

  }

  desconectar(){
console.log("hola")
    this.router.navigate([""]);
    }
}
