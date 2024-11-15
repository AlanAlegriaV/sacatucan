import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-publicar-modal',
  templateUrl: './publicar-modal.page.html',
  styleUrls: ['./publicar-modal.page.scss'],
})
export class PublicarModalPage implements OnInit {

  publicarForm!: FormGroup;
  usuario: any = {};
  paseadorExistente: any;
  imagenBase64: string = '';
  imagenUrl: string = '';
  uploadInProgress: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    // Inicialización del formulario
    this.publicarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: [{ value: '', disabled: true }, Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarDatosPaseador();  // Método que carga los datos según la situación
  }

  cargarDatosPaseador() {
    // Obtener el usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuario.uid = user.uid;
        this.usuario.correo = user.email;

        // Verificar si el paseador ya existe en Realtime Database bajo el UID del usuario
        this.db.object(`paseadores/${this.usuario.uid}`).valueChanges().subscribe((paseadorData: any) => {
          if (paseadorData) {
            // Situación 1: Si ya existe una publicación de paseador
            this.paseadorExistente = paseadorData;
            this.imagenUrl = paseadorData.imagen || '';

            // Llenar el formulario con los datos existentes
            this.publicarForm.patchValue({
              nombre: paseadorData.nombre,
              apellido: paseadorData.apellido,
              correo: paseadorData.correo,
              descripcion: paseadorData.descripcion,
              imagen: this.imagenUrl  // O la URL de la imagen existente
            });
          } else {
            // Situación 2: Si no existe publicación, cargar los datos básicos del usuario
            this.cargarUsuario();
          }
        });
      }
    });
  }
  cargarUsuario(){
    // Obtener los datos del usuario logueado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuario.uid = user.uid;
        this.usuario.correo = user.email;

        // Establecer el valor del campo de correo una vez que se obtiene el usuario
        this.publicarForm.patchValue({
          correo: this.usuario.correo
        });

        // Consultar los datos de nombre y apellido del usuario en Realtime Database
        this.db.object(`usuarios/${this.usuario.uid}`).valueChanges()
          .subscribe((usuarioData: any) => {
            if (usuarioData) {
              this.usuario.nombre = usuarioData.nombre;
              this.usuario.apellido = usuarioData.apellido;

              // Completar los campos de nombre y apellido en el formulario
              this.publicarForm.patchValue({
                nombre: this.usuario.nombre,
                apellido: this.usuario.apellido
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

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    this.imagenBase64 = image.dataUrl!;
    this.publicarForm.patchValue({ imagen: this.imagenBase64 });
  }
  

  // Método para manejar el cambio de imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
        this.publicarForm.patchValue({ imagen: this.imagenBase64 });
      };
      reader.readAsDataURL(file);
    }
  }

  // Guardar paseador y subir la imagen a Firebase Storage
  guardarPaseador() {
    if (this.imagenBase64) {
      this.uploadInProgress = true;
      const filePath = `paseadores/${this.usuario.uid}`;  // Guardar la imagen con el UID del usuario
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(this.imagenBase64, 'data_url');

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imagenUrl = url;
            this.guardarDatosPaseador();  // Guardar los datos del paseador en la base de datos
          });
        })
      ).subscribe();
    } else {
      this.guardarDatosPaseador();
    }
  }

  // Guardar los datos del paseador en Realtime Database usando el UID del usuario como ID
  guardarDatosPaseador() {
    const nuevoPaseador = {
      nombre: this.publicarForm.value.nombre,
      apellido: this.publicarForm.value.apellido,
      correo: this.usuario.correo,
      descripcion: this.publicarForm.value.descripcion,
      imagen: this.imagenUrl || ''
    };

    // Guardar los datos en `paseadores/{uid}`, donde `uid` es el UID del usuario
    this.db.object(`paseadores/${this.usuario.uid}`).set(nuevoPaseador)
      .then(() => {
        alert('Paseador guardado correctamente');
        this.modalController.dismiss({ refresh: true });
        this.uploadInProgress = false;
      })
      .catch((error) => {
        console.error('Error al guardar el paseador en Firebase:', error);
        alert('Error al guardar el paseador. Inténtalo de nuevo.');
        this.uploadInProgress = false;
      });
  }
}
