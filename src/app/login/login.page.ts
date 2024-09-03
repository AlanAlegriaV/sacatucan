import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router) {}  // Inyecta Router

  navigateToLogin2() {
    this.router.navigate(['/login2']);  // Redirige a login2
  }
}
