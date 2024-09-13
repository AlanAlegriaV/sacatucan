import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de tener esto
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-mascotas-modal-edit',
  templateUrl: './mascotas-modal-edit.page.html',
  styleUrls: ['./mascotas-modal-edit.page.scss'],
})
export class MascotasModalEditPage implements OnInit {
  mascotaForm!: FormGroup;  // Agrega el signo de exclamación para decir que será inicializado más tarde
  mascota: any;
  imagenPrevisualizacion: string | ArrayBuffer | null = null; // Para mostrar la imagen previsualizada

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.mascota = this.navParams.get('mascota'); // Obtener la mascota pasada al modal
    this.mascotaForm = this.formBuilder.group({
      nombre: [this.mascota.nombre, Validators.required],
      edad: [this.mascota.edad, Validators.required],
      sexo: [this.mascota.sexo, Validators.required],
      descripcion: [this.mascota.descripcion, Validators.required],
      imagen: [this.mascota.imagen || ''] // Cargar la imagen existente si la hay
    });

    // Cargar la imagen en la previsualización si ya existe
    this.imagenPrevisualizacion = this.mascota.imagen;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevisualizacion = reader.result; // Almacenar la previsualización de la imagen
        this.mascotaForm.patchValue({
          imagen: reader.result // Actualizar el valor de la imagen en el formulario
        });
      };
      reader.readAsDataURL(file); // Leer la imagen
    }
  }

  guardarCambios() {
    if (this.mascotaForm.valid) {
      const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
      const indiceMascota = mascotas.findIndex((m: any) =>
        m.nombre === this.mascota.nombre && m.correo === this.mascota.correo
      );

      if (indiceMascota !== -1) {
        mascotas[indiceMascota] = this.mascotaForm.value;
        mascotas[indiceMascota].correo = this.mascota.correo; // Mantener el correo sin cambios
        localStorage.setItem('mascotas', JSON.stringify(mascotas));
        this.modalController.dismiss({ actualizado: true });
      }
    }
  }

  cancelar() {
    this.modalController.dismiss();
  }
}
