import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']); // Navega a la página home
  }
}
