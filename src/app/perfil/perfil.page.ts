import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page'; // Modal para editar paseador
import { MascotasModalEditPage } from '../mascotas-modal-edit/mascotas-modal-edit.page'; // Modal para editar mascota

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuario: any = {};  // Información del usuario logueado
  misPaseadores: any[] = [];  // Publicaciones del usuario como paseador
  misMascotas: any[] = [];  // Publicaciones del usuario como mascotas
  mostrarPaseadores: boolean = false;
  mostrarMascotas: boolean = false;
  cambiarComuna: boolean = false;
  cambiarPassword: boolean = false;
  mostrarMensajes: boolean = false; // Control para mostrar/ocultar los mensajes

  regionTemporal: string = '';
  comunaTemporal: string = '';
  regiones: any[] = [];
  comunas: any[] = [];

  passwordActual: string = '';
  nuevaPassword: string = '';
  repetirPassword: string = '';

  constructor(private router: Router, private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.cargarRegiones();  // Cargar las regiones y comunas disponibles
  }

  cargarDatosUsuario() {
    const correoLogueado = localStorage.getItem('correoLogueado'); // Obtener el correo del usuario logueado

    if (correoLogueado) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioLogueado = usuarios.find((user: any) => user.correo === correoLogueado);

      if (usuarioLogueado) {
        this.usuario = {
          nombre: usuarioLogueado.nombre,
          apellido: usuarioLogueado.apellido,
          correo: usuarioLogueado.correo,
          telefono: usuarioLogueado.telefono,
          region: usuarioLogueado.region,
          comuna: usuarioLogueado.comuna
        };
      }
    }
  }

  togglePaseadores() {
    this.mostrarPaseadores = !this.mostrarPaseadores;
    if (this.mostrarPaseadores) {
      this.verMisPaseadores();
    }
  }

  toggleMascotas() {
    this.mostrarMascotas = !this.mostrarMascotas;
    if (this.mostrarMascotas) {
      this.verMisMascotas();
    }
  }

  verMisPaseadores() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    const paseadores: any[] = JSON.parse(localStorage.getItem('paseadores') || '[]');
    this.misPaseadores = paseadores.filter((paseador: any) => paseador.correo === correoLogueado);
  }

  verMisMascotas() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    const mascotas: any[] = JSON.parse(localStorage.getItem('mascotas') || '[]');
    this.misMascotas = mascotas.filter((mascota: any) => mascota.correo === correoLogueado);
  }

  async editarPaseador(paseador: any) {
    const modal = await this.modalCtrl.create({
      component: PublicarModalPage,
      componentProps: { paseador }
    });
    modal.onDidDismiss().then(() => this.verMisPaseadores());
    return await modal.present();
  }

  async editarMascota(mascota: any) {
    const modal = await this.modalCtrl.create({
      component: MascotasModalEditPage,
      componentProps: { mascota }
    });
    modal.onDidDismiss().then(() => this.verMisMascotas());
    return await modal.present();
  }

  eliminarPaseador() {
    if (confirm('¿Estás seguro de eliminar tu publicación como paseador?')) {
      const paseadores = JSON.parse(localStorage.getItem('paseadores') || '[]');
      const nuevosPaseadores = paseadores.filter((p: any) => p.correo !== this.usuario.correo);
      localStorage.setItem('paseadores', JSON.stringify(nuevosPaseadores));
      this.verMisPaseadores();
    }
  }

  eliminarMascota(mascota: any) {
    if (confirm(`¿Estás seguro de eliminar la publicación de la mascota ${mascota.nombre}?`)) {
      const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
      const nuevasMascotas = mascotas.filter((m: any) => !(m.correo === mascota.correo && m.nombre === mascota.nombre));
      localStorage.setItem('mascotas', JSON.stringify(nuevasMascotas));
      this.verMisMascotas();
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

  guardarComuna() {
    this.usuario.region = this.regionTemporal;
    this.usuario.comuna = this.comunaTemporal;
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
    this.cambiarComuna = false;
  }

  mostrarCambioPassword() {
    this.cambiarPassword = true;
  }

  cancelarPassword() {
    this.cambiarPassword = false;
  }

  guardarPassword() {
    if (this.nuevaPassword === this.repetirPassword) {
      this.usuario.password = this.nuevaPassword;
      localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
      this.cambiarPassword = false;
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

  guardarCambios() {
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuario));
    alert('Cambios guardados correctamente.');
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
