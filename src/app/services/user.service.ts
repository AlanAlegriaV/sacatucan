import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];

  constructor() {
    // Cargar los usuarios almacenados en localStorage (si existen)
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  // Método para registrar un nuevo usuario
  registerUser(nombre: string, apellidos: string, email: string, password: string): boolean {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      console.log('El usuario ya existe');
      return false;  // Usuario ya registrado
    }

    const newUser = { nombre, apellidos, email, password };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log('Usuario registrado con éxito:', newUser);
    return true;
  }

  // Método para validar el inicio de sesión
  loginUser(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Inicio de sesión exitoso:', user);
      return true;
    }
    return false;
  }

  // Validación del formato de correo electrónico
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
}
