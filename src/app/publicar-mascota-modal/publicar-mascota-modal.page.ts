import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder, FormGroup y Validators
import { ModalController } from '@ionic/angular'; // Importar ModalController
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Importar AngularFireDatabase para Realtime Database
import { AngularFireStorage } from '@angular/fire/compat/storage';  // Importar AngularFireStorage para Firebase Storage
import { finalize } from 'rxjs/operators'; // Para manejar la finalización de la subida de imagen
import { v4 as uuidv4 } from 'uuid';  // Importar uuid para generar identificadores únicos
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importar AngularFireAuth


@Component({
  selector: 'app-publicar-mascota-modal',
  templateUrl: './publicar-mascota-modal.page.html',
  styleUrls: ['./publicar-mascota-modal.page.scss'],
})
export class PublicarMascotaModalPage {
  mascotaForm: FormGroup;
  correoLogueado: string = '';
  imagenBase64: string = ''; // Variable para almacenar la imagen en base64
  imagenUrl: string = ''; // Variable para almacenar la URL de la imagen subida
  uploadInProgress: boolean = false; // Para indicar si la subida de la imagen está en progreso

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth 
  ) {

     // Llamamos a la función para obtener el correo
     this.obtenerCorreoUsuarioLogueado();
   
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      descripcion: ['', Validators.required],
      correo: [this.correoLogueado] // Se agrega el correo automáticamente
    });
  }

  // Función para obtener el correo del usuario logueado
  obtenerCorreoUsuarioLogueado() {
    // Usar authState primero
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        this.correoLogueado = user.email;
        this.mascotaForm.patchValue({ correo: this.correoLogueado });
      } else {
        // Si no hay correo en authState, intentamos obtenerlo con currentUser
        this.afAuth.currentUser.then(currentUser => {
          if (currentUser && currentUser.email) {
            this.correoLogueado = currentUser.email;
            this.mascotaForm.patchValue({ correo: this.correoLogueado });
          } else {
            console.error('No se pudo obtener el correo del usuario logueado.');
          }
        }).catch(error => {
          console.error('Error al obtener el correo del usuario logueado:', error);
        });
      }
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

// Guardar mascota y subir la imagen a Firebase Storage
guardarMascota() {
  if (this.imagenBase64) {
    this.uploadInProgress = true;  // Indicar que la subida está en progreso
    const filePath = `mascotas/${uuidv4()}`;  // Generar un identificador único para el archivo
    const fileRef = this.storage.ref(filePath);  // Referencia al archivo en Firebase Storage
    const task = fileRef.putString(this.imagenBase64, 'data_url');  // Subir la imagen en base64

    // Cuando la subida termine, obtener la URL de la imagen y guardar los datos en Realtime Database
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imagenUrl = url;  // Almacenar la URL de la imagen
          this.guardarDatosMascota();  // Llamar a la función que guarda los datos en Realtime Database
        });
      })
    ).subscribe();
  } else {
    this.guardarDatosMascota();  // Si no hay imagen, guardar solo los datos en la base de datos
  }
}

// Guardar los datos de la mascota en Realtime Database
async guardarDatosMascota() {
  const user = await this.afAuth.currentUser;
  const uid = user?.uid;  // Aquí deberías obtener el UID del usuario logueado
  const mascotaId = uuidv4();  // Generar un identificador único para la mascota

  const nuevaMascota = {
    ...this.mascotaForm.value,
    imagenUrl: this.imagenUrl || '',  // Agregar la URL de la imagen, si existe
    
  };

  // Guardar los datos de la mascota en el nodo `mascotas/{uid}/{mascotaId}`
  this.db.object(`mascotas/${uid}/${mascotaId}`).set(nuevaMascota)
    .then(() => {
      alert('Mascota publicada correctamente.');
      this.modalController.dismiss();  // Cerrar el modal
      this.uploadInProgress = false;  // Reiniciar el estado de la subida
    })
    .catch((error) => {
      console.error('Error al guardar la mascota en Firebase:', error);
      alert('Error al publicar la mascota. Inténtalo de nuevo.');
      this.uploadInProgress = false;
    });
}

  cancelar() {
    this.modalController.dismiss();
  }
}
