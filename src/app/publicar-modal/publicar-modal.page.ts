import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicar-modal',
  templateUrl: './publicar-modal.page.html',
  styleUrls: ['./publicar-modal.page.scss'],
})
export class PublicarModalPage implements OnInit {

  publicarForm!: FormGroup;  // Usamos el operador ! para decir que será inicializado después
  usuario: any;  // Almacena los datos del usuario logueado
  paseadorExistente: any;  // Almacena si ya existe un paseador registrado

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Obtén los datos del usuario logueado
    const correoLogueado = localStorage.getItem('correoLogueado');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    this.usuario = usuarios.find((u: any) => u.correo === correoLogueado);

    // Obtén los paseadores almacenados
    const paseadores = JSON.parse(localStorage.getItem('paseadores') || '[]');
    
    // Verifica si ya existe una publicación del paseador
    this.paseadorExistente = paseadores.find((p: any) => p.correo === this.usuario.correo);

    // Inicializa el formulario con los datos del usuario y si existe la publicación, con los datos de paseador existente
    this.publicarForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      correo: [{ value: this.usuario.correo, disabled: true }, Validators.required],
      descripcion: [this.paseadorExistente ? this.paseadorExistente.descripcion : '', Validators.required],
      imagen: [this.paseadorExistente ? this.paseadorExistente.imagen : '', Validators.required]
    });
  }

  // Método para cancelar y cerrar el modal
  cancelar() {
    this.modalController.dismiss({ refresh: false });
  }

  // Método para manejar el cambio de imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.publicarForm.patchValue({ imagen: e.target.result });
    };
    reader.readAsDataURL(file);
  }

  // Método para enviar el formulario
  submit() {
    const paseadores = JSON.parse(localStorage.getItem('paseadores') || '[]');

    const paseador = {
      nombre: this.publicarForm.value.nombre,
      apellido: this.publicarForm.value.apellido,
      correo: this.usuario.correo,
      descripcion: this.publicarForm.value.descripcion,
      imagen: this.publicarForm.value.imagen
    };

    const index = paseadores.findIndex((p: any) => p.correo === this.usuario.correo);

    if (index > -1) {
      paseadores[index] = paseador;
    } else {
      paseadores.push(paseador);
    }

    localStorage.setItem('paseadores', JSON.stringify(paseadores));

    this.modalController.dismiss({ refresh: true });
  }
}
