import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {

  constructor(private router: Router) {}  // Inyecta el Router

  navigateToRecupera() {
    this.router.navigate(['/recupera']);  // Redirige a la página 'recupera'
  }
}
