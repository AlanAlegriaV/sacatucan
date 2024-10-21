import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Para crear usuarios en Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importamos Firestore para almacenar datos adicionales


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = {
    correo: '',
    nombre: '',
    apellido: '',
    telefono: '',
    password: '',
    repetirPassword: '',
    region: '',
    comuna: ''
  };

  regiones: any[] = [];  // Lista de regiones
  comunas: string[] = [];  // Lista de comunas dependiendo de la región seleccionada
  error: string = ''; // Variable para almacenar mensajes de error


  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit() {
    // Definir las regiones y sus comunas directamente en el código
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

  // Método para actualizar las comunas cuando se selecciona una región
  onRegionChange(region: string) {
    const selectedRegionData = this.regiones.find(r => r.region === region);
    if (selectedRegionData) {
      // Ordenar las comunas alfabéticamente y actualizarlas
      this.comunas = selectedRegionData.comunas.sort((a: string, b: string) => a.localeCompare(b));
    } else {
      this.comunas = [];
    }
  }

  // Método para manejar la validación del formulario y el registro de usuarios
  async registrarUsuario() {
    if (!this.validarDatos()) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    if (this.usuario.password !== this.usuario.repetirPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.usuario.correo, this.usuario.password);
      const uid = userCredential.user?.uid;
      console.log('UID del usuario:', uid);


      // Si el registro fue exitoso, guardar los demás datos del usuario en Firestore
      if (uid) {
        await this.firestore.collection('usuarios').doc(uid).set({
          correo: this.usuario.correo || '',         // Guardar correo electrónico
          nombre: this.usuario.nombre || '',         // Guardar nombre del usuario
          apellido: this.usuario.apellido || '',     // Guardar apellido
          telefono: this.usuario.telefono || '',     // Guardar número de teléfono
          region: this.usuario.region || '',         // Guardar la región seleccionada
          comuna: this.usuario.comuna || '',         // Guardar la comuna seleccionada
          // NOTA: No se debe guardar la contraseña o repetir contraseña por razones de seguridad.
        });
      }

      alert('Registro exitoso.');
      this.router.navigate(['/login']);  // Redirigir al login después del registro exitoso

    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      this.error = 'Error al registrar el usuario. Intenta nuevamente.';
    }
  }

  validarDatos(): boolean {
    // Validar que todos los campos estén completos
    return !!this.usuario.correo && !!this.usuario.nombre && !!this.usuario.apellido && !!this.usuario.telefono &&
           !!this.usuario.region && !!this.usuario.comuna;
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Asegúrate de que la ruta '/login' esté configurada
  }
}
