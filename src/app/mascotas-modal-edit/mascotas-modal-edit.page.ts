import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de tener esto
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importamos AngularFireDatabase para Realtime Database
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Para obtener el UID del usuario actual

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
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.mascota = this.navParams.get('mascota'); // Obtener la mascota pasada al modal
    this.mascotaForm = this.formBuilder.group({
      nombre: [this.mascota.nombre, Validators.required],
      edad: [this.mascota.edad, Validators.required],
      sexo: [this.mascota.sexo, Validators.required],
      descripcion: [this.mascota.descripcion, Validators.required],
      imagen: [this.mascota.imagenUrl || ''] // Cargar la imagen existente si la hay
    });

    // Cargar la imagen en la previsualización si ya existe
    this.imagenPrevisualizacion = this.mascota.imagenUrl;
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

  async guardarCambios() {
    // Verificar si el formulario es válido
    if (this.mascotaForm.valid) {
      // Obtenemos el UID del dueño de la mascota
      const user = await this.afAuth.currentUser;
      const uid = user?.uid; // Obtener el UID del usuario actual
  
      if (!uid) {
        console.error('Error: No se pudo obtener el UID del usuario.');
        return;
      }
  
      // Asegurarse de que la mascota tenga un id (mascotaId) antes de actualizar
      const mascotaId = this.mascota.mascotaId;  // Accedemos a la propiedad mascotaId de la mascota seleccionada
      if (!mascotaId) {
        console.error('Error: No se pudo obtener el ID de la mascota.');
        return;
      }
  
      // Actualizamos la información de la mascota en el nodo `mascotas/{uid}/{mascotaId}`
      this.db.object(`mascotas/${uid}/${mascotaId}`)
        .update(this.mascotaForm.value)  // Actualizamos los datos de la mascota
        .then(() => {
          alert('Mascota actualizada correctamente');
          this.modalController.dismiss({ actualizado: true });  // Cerramos el modal y notificamos éxito
        })
        .catch((error) => {
          console.error('Error al actualizar la mascota en Firebase:', error);
          alert('Error al actualizar la mascota. Inténtalo de nuevo.');
        });
    } else {
      console.error('El formulario no es válido.');
    }
  }
  

  cancelar() {
    this.modalController.dismiss();
  }
}
