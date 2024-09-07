import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: any[] = [];
  private paseadores: any[] = [];
  private mascotas: any[] = [];

  constructor() {
    // Cargar usuarios desde localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    // Cargar paseadores desde localStorage
    const storedPaseadores = localStorage.getItem('paseadores');
    if (storedPaseadores) {
      this.paseadores = JSON.parse(storedPaseadores);
    }

    // Cargar mascotas desde localStorage
    const storedMascotas = localStorage.getItem('mascotas');
    if (storedMascotas) {
      this.mascotas = JSON.parse(storedMascotas);
    }
  }

  // Método para registrar un nuevo usuario
  registerUser(nombre: string, apellidos: string, email: string, password: string): boolean {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      return false;  // Usuario ya registrado
    }

    const newUser = { nombre, apellidos, email, password };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  // Método para validar el inicio de sesión
  loginUser(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));  // Guardar usuario actual
      return true;
    }
    return false;
  }

  // Obtener el usuario logueado
  getUsuarioActual() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  // Método para registrar o sobreescribir un paseador
  registrarPaseador(paseador: any): boolean {
    const existingPaseadorIndex = this.paseadores.findIndex(p => p.email === paseador.email);
    
    if (existingPaseadorIndex !== -1) {
      // Si el paseador ya existe, sobreescribimos su información
      this.paseadores[existingPaseadorIndex] = paseador;
    } else {
      // Si no existe, lo agregamos
      this.paseadores.push(paseador);
    }
    
    // Guardar los paseadores actualizados en localStorage
    localStorage.setItem('paseadores', JSON.stringify(this.paseadores));
    return true;
  }

  // Obtener todos los paseadores registrados
  obtenerPaseadores(): any[] {
    return this.paseadores;
  }

  // Método para registrar o sobreescribir una mascota
  registrarMascota(mascota: any): boolean {
    const existingMascotaIndex = this.mascotas.findIndex(m => m.nombre === mascota.nombre);

    if (existingMascotaIndex !== -1) {
      // Si la mascota ya existe, sobreescribimos su información
      this.mascotas[existingMascotaIndex] = mascota;
    } else {
      // Si no existe, la agregamos
      this.mascotas.push(mascota);
    }

    // Guardar las mascotas actualizadas en localStorage
    localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
    return true;
  }

  // Obtener todas las mascotas registradas
  obtenerMascotas(): any[] {
    return this.mascotas;
  }

  // Validar el formato de un correo electrónico
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
}
