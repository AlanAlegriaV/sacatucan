import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  posts = [
    {
      name: 'Ana',
      image: 'assets/ANA.png',
      description: 'Disponible para pasear perros en las tardes. ¡Amante de los animales!'
    },
    {
      name: 'Carlos',
      image: 'assets/CARLOS.png',
      description: 'Ama los perros y disfruta pasearlos por el parque.'
    },
    {
      name: 'Lucía',
      image: 'assets/LUCIA.png',
      description: 'Paseos seguros y divertidos. ¡Tu perro estará feliz!'
    }
  ];

  constructor(private router: Router) {}

  // Métodos para los botones de la barra inferior
  goToProfile() {
    console.log('Navegando al perfil');
    // Navegar o realizar la acción que quieras
    // Ejemplo: this.router.navigate(['/profile']);
  }

  goToDogSection() {
    console.log('Navegando a la sección de perros');
    // Navegar o realizar la acción que quieras
    // Ejemplo: this.router.navigate(['/dog-section']);
  }

  goToHistory() {
    console.log('Navegando al historial');
    // Navegar o realizar la acción que quieras
    // Ejemplo: this.router.navigate(['/history']);
  }

  goToWalker() {
    this.router.navigate(['/walker']); // Navegar a la página walker
  }
  
}
