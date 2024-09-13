import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder, FormGroup y Validators
import { ModalController } from '@ionic/angular'; // Importar ModalController

@Component({
  selector: 'app-publicar-mascota-modal',
  templateUrl: './publicar-mascota-modal.page.html',
  styleUrls: ['./publicar-mascota-modal.page.scss'],
})
export class PublicarMascotaModalPage {
  mascotaForm: FormGroup;
  correoLogueado: string;
  imagenBase64: string = ''; // Variable para almacenar la imagen en base64

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.correoLogueado = localStorage.getItem('correoLogueado') || ''; // Obtener correo logueado

    this.mascotaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      descripcion: ['', Validators.required],
      correo: [this.correoLogueado] // Se agrega el correo automáticamente
    });
  }

  // Manejar el cambio de archivo (subir imagen)
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string; // Convertir la imagen a base64
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  }

  guardarMascota() {
    const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
    
    // Verificar si ya existe una mascota con el mismo nombre y correo
    const mascotaExiste = mascotas.some((mascota: any) =>
      mascota.nombre === this.mascotaForm.value.nombre && 
      mascota.correo === this.mascotaForm.value.correo
    );

    if (mascotaExiste) {
      alert('Ya has registrado una mascota con este nombre.');
    } else {
      // Guardar la nueva mascota con la imagen en base64
      const nuevaMascota = {
        ...this.mascotaForm.value,
        imagen: this.imagenBase64 // Agregar la imagen en base64
      };
      mascotas.push(nuevaMascota);
      localStorage.setItem('mascotas', JSON.stringify(mascotas));
      alert('Mascota publicada correctamente.');
      this.modalController.dismiss();
    }
  }

  cancelar() {
    this.modalController.dismiss();
  }
}
