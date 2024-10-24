import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Para obtener el UID del usuario logueado
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Para interactuar con Realtime Database
import  firebase  from 'firebase/compat/app';  // Necesario para acceder a firebase.auth

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuario: any = {};  // Información del usuario logueado
  cambiarComuna: boolean = false;
  cambiarPassword: boolean = false;

  regionTemporal: string = '';
  comunaTemporal: string = '';
  regiones: any[] = [];
  comunas: any[] = [];

  passwordActual: string = '';
  nuevaPassword: string = '';
  repetirPassword: string = '';

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.cargarRegiones();  // Cargar las regiones y comunas disponibles
  }

  async cargarDatosUsuario() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual logueado
    const uid = user?.uid;  // Obtener el UID del usuario

    if (uid) {
      // Acceder a los datos en Realtime Database utilizando el UID
      const usuarioRef = this.db.object(`usuarios/${uid}`);
      usuarioRef.valueChanges().subscribe((data: any) => {
        if (data) {
          // Asignar los datos obtenidos a la variable 'usuario'
          this.usuario = {
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            telefono: data.telefono,
            region: data.region,
            comuna: data.comuna
          };
        } else {
          console.log('No se encontraron datos para este usuario.');
        }
      }, error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
    } else {
      console.log('No se pudo obtener el UID del usuario.');
    }
  }


  mostrarCambioComuna() {
    this.cambiarComuna = true;
  }

  cancelarComuna() {
    this.cambiarComuna = false;
  }

  onRegionChange(region: string) {
    const regionSeleccionada = this.regiones.find((r) => r.region === region);
    if (regionSeleccionada) {
      this.comunas = regionSeleccionada.comunas;
    }
  }

  async guardarComuna() {
    const user = await this.afAuth.currentUser; // Obtener el usuario actual logueado
    const uid = user?.uid;  // Obtener el UID del usuario

    if (uid) {  // Actualizar la región y comuna en Realtime Database
      this.usuario.region = this.regionTemporal;
      this.usuario.comuna = this.comunaTemporal;

      const usuarioRef = this.db.object(`usuarios/${uid}`); // Referencia al usuario en la base de datos

      // Actualizar en la base de datos
      usuarioRef.update({
        region: this.usuario.region,
        comuna: this.usuario.comuna
      }).then(() => {
        console.log('Región y comuna actualizadas correctamente en Realtime Database');
        this.cambiarComuna = false; // Ocultar el campo de cambio de comuna
      }).catch(error => {
        console.error('Error al actualizar la región y comuna:', error);
      });
    } else {
      console.error('No se pudo obtener el UID del usuario.');
    }
  }

  mostrarCambioPassword() {
    this.passwordActual = '';
    this.nuevaPassword = '';
    this.repetirPassword = '';
    this.cambiarPassword = true;
  }

  cancelarPassword() {
    this.cambiarPassword = false;
  }

  async guardarPassword() {
    try {
      const user = await this.afAuth.currentUser; // Obtener el usuario actual logueado
      const uid = user?.uid;  // Obtener el UID del usuario logueado
  
      if (!user) {
        alert('No se pudo obtener el usuario actual. Inicia sesión nuevamente.');
        return;
      }
  
      // Verificar que las nuevas contraseñas coincidan
      if (this.nuevaPassword !== this.repetirPassword) {
        alert('La nueva contraseña y la repetición no coinciden.');
        return;
      }
  
      // Reautenticar al usuario para validar la contraseña actual
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email!,  // Email del usuario logueado
        this.passwordActual // Contraseña actual ingresada por el usuario
      );
  
      await user.reauthenticateWithCredential(credentials); // Reautenticación
  
      // Si la reautenticación fue exitosa, actualizar la contraseña
      await user.updatePassword(this.nuevaPassword);
  
      alert('Contraseña actualizada correctamente.');
      this.cambiarPassword = false; // Ocultar los botones de aceptar y cancelar después de actualizar
  
    } catch (error: any) {
      // Verificar si el error es de tipo `auth/wrong-password` o `auth/invalid-credential`
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        // Si la contraseña actual no es correcta
        alert('La contraseña actual no es correcta.');
      } else if (error.code === 'auth/requires-recent-login') {
        // Si es necesario reautenticar al usuario
        alert('Por razones de seguridad, por favor vuelve a iniciar sesión.');
      } else {
        // Manejar otros errores generales
        console.error('Error al actualizar la contraseña:', error);
        alert('Error al actualizar la contraseña. Inténtalo de nuevo.');
      }
    }
  }

  async guardarCambios() {
    try {
      const user = await this.afAuth.currentUser; // Obtener el usuario actual logueado
      const uid = user?.uid; // Obtener el UID del usuario logueado
  
      // Referencia al usuario en la base de datos
      const usuarioRef = this.db.object(`usuarios/${uid}`);
  
      // Actualizar los datos del usuario en Realtime Database
      await usuarioRef.update({
        nombre: this.usuario.nombre || '',        // Actualizar nombre
        apellido: this.usuario.apellido || '',    // Actualizar apellido
        telefono: this.usuario.telefono || '',    // Actualizar teléfono
      });
  
      // Mostrar alerta de éxito
      alert('Cambios guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
    }
  }
  

  cargarRegiones() {
    this.regiones = [
      {
        region: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
      },
      {
        region: "Tarapacá",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
      },
      {
        region: "Antofagasta",
        comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
      },
      {
        region: "Atacama",
        comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
      },
      {
        region: "Coquimbo",
        comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
      },
      {
        region: "Valparaíso",
        comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales"]
      },
      {
        region: "Libertador Gral. Bernardo O’Higgins",
        comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente"]
      },
      {
        region: "El Maule",
        comunas: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén"]
      },
      {
        region: "Ñuble",
        comunas: ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay"]
      },
      {
        region: "Biobío",
        comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"]
      },
      {
        region: "Araucanía",
        comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica"]
      },
      {
        region: "Los Ríos",
        comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli"]
      },
      {
        region: "Los Lagos",
        comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
      },
      {
        region: "Aisén ",
        comunas: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
      },
      {
        region: "Magallanes",
        comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
      },
      {
        region: "Región Metropolitana de Santiago",
        comunas: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
      }

    ];
  }

}
