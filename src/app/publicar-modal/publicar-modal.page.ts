import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Firebase Realtime Database
import { AngularFireStorage } from '@angular/fire/compat/storage';  // Firebase Storage
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Firebase Auth
import { finalize } from 'rxjs/operators';  // Para manejar la finalización de la subida de imagen
import { v4 as uuidv4 } from 'uuid';  // Para generar identificadores únicos

@Component({
  selector: 'app-publicar-modal',
  templateUrl: './publicar-modal.page.html',
  styleUrls: ['./publicar-modal.page.scss'],
})
export class PublicarModalPage implements OnInit {

  publicarForm!: FormGroup;  // Inicializar correctamente
  usuario: any = {};  // Información del usuario logueado
  paseadorExistente: any;  // Paseador existente si ya ha publicado
  imagenBase64: string = '';  // Imagen en base64
  imagenUrl: string = '';  // URL de la imagen subida
  uploadInProgress: boolean = false;  // Indicar si la subida está en progreso

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,  // Realtime Database
    private storage: AngularFireStorage,  // Firebase Storage
    private afAuth: AngularFireAuth  // Firebase Auth
  ) {
    // Inicialización del formulario
    this.publicarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: [{ value: '', disabled: true }, Validators.required],  // Este campo se inicializa vacío y se rellena más tarde
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener los datos del usuario logueado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuario.uid = user.uid;  // Usar el UID del usuario logueado
        this.usuario.correo = user.email;
        

        // Establecer el valor del campo de correo una vez que se obtiene el usuario
        this.publicarForm.patchValue({
          correo: this.usuario.correo
        });

        // Verificar si el paseador ya existe en Realtime Database bajo el UID del usuario
        this.db.object(`paseadores/${this.usuario.uid}`).valueChanges()
          .subscribe((paseador: any) => {
            if (paseador) {
              this.paseadorExistente = paseador;
              this.publicarForm.patchValue({
                nombre: paseador.nombre,
                apellido: paseador.apellido,
                descripcion: paseador.descripcion,
                imagen: paseador.imagen
              });
            }
          });
      }
    });
  }

  // Método para cancelar y cerrar el modal
  cancelar() {
    this.modalController.dismiss({ refresh: false });
  }

  // Método para manejar el cambio de imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;  // Convertir la imagen a base64
        this.publicarForm.patchValue({ imagen: this.imagenBase64 });
      };
      reader.readAsDataURL(file);  // Leer el archivo como base64
    }
  }

  // Guardar paseador y subir la imagen a Firebase Storage
  guardarPaseador() {
    if (this.imagenBase64) {
      this.uploadInProgress = true;  // Indicar que la subida está en progreso
      const filePath = `paseadores/${this.usuario.uid}/${uuidv4()}`;  // Guardar la imagen bajo el UID del usuario y un ID único
      const fileRef = this.storage.ref(filePath);  // Referencia al archivo en Firebase Storage
      const task = fileRef.putString(this.imagenBase64, 'data_url');  // Subir la imagen en base64

      // Cuando la subida termine, obtener la URL de la imagen y guardar los datos en Realtime Database
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imagenUrl = url;  // Guardar la URL de la imagen
            this.guardarDatosPaseador();  // Guardar los datos del paseador en la base de datos
          });
        })
      ).subscribe();
    } else {
      this.guardarDatosPaseador();  // Si no hay imagen, guardar solo los datos del paseador
    }
  }

  // Guardar los datos del paseador en Realtime Database bajo el UID del usuario logueado
  guardarDatosPaseador() {
    const paseadorId = this.paseadorExistente ? this.paseadorExistente.id : uuidv4();  // Generar un ID único para el paseador
    const nuevoPaseador = {
      id: paseadorId,  // Asignar el ID del paseador
      nombre: this.publicarForm.value.nombre,
      apellido: this.publicarForm.value.apellido,
      correo: this.usuario.correo,
      descripcion: this.publicarForm.value.descripcion,
      imagen: this.imagenUrl || this.paseadorExistente.imagen || ''
    };

    // Guardar los datos del paseador en el nodo `paseadores/{uid}/{paseadorId}`
    this.db.object(`paseadores/${this.usuario.uid}/${paseadorId}`).set(nuevoPaseador)
      .then(() => {
        alert('Paseador guardado correctamente');
        this.modalController.dismiss({ refresh: true });
        this.uploadInProgress = false;  // Reiniciar el estado de la subida
      })
      .catch((error) => {
        console.error('Error al guardar el paseador en Firebase:', error);
        alert('Error al guardar el paseador. Inténtalo de nuevo.');
        this.uploadInProgress = false;
      });
  }
}
