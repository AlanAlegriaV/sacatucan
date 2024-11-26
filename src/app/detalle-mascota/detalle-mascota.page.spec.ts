import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMascotaPage } from './detalle-mascota.page';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';

describe('DetalleMascotaPage', () => {
  let component: DetalleMascotaPage;
  let fixture: ComponentFixture<DetalleMascotaPage>;
  let dbSpy: jasmine.SpyObj<AngularFireDatabase>;

  beforeEach(async () => {
    // Creamos el espía para AngularFireDatabase
    dbSpy = jasmine.createSpyObj('AngularFireDatabase', ['object', 'createPushId']);
    dbSpy.object.and.returnValue({
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      query: {} as any,
      valueChanges: jasmine.createSpy('valueChanges'),
      snapshotChanges: jasmine.createSpy('snapshotChanges'),
      update: jasmine.createSpy('update'),
      remove: jasmine.createSpy('remove'),
    });
    dbSpy.createPushId.and.returnValue('test-uuid');

    await TestBed.configureTestingModule({
      declarations: [DetalleMascotaPage],
      providers: [
        { provide: AngularFireDatabase, useValue: dbSpy }, // Usamos el espía como proveedor
        { provide: AngularFireAuth, useValue: { authState: of({ uid: 'test-uid' }) } },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ mascota: JSON.stringify({ uid: 'test-uid', nombre: 'Firulais' }) }) },
        },
        { provide: NavController, useValue: { back: jasmine.createSpy('back') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería guardar un mensaje en Firebase', async () => {
    // Preparamos los datos necesarios
    component.usuarioActual = { nombre: 'Juan', apellido: 'Perez', correo: 'juan@example.com', telefono: '123456789' };
    component.mascota = { uid: 'test-owner-uid', nombre: 'Firulais' };

    // Llamamos al método contactar
    await component.contactar();

    // Verificamos que se haya llamado a Firebase con los datos correctos
    expect(dbSpy.createPushId).toHaveBeenCalled();
    expect(dbSpy.object).toHaveBeenCalledWith('mensajes/test-owner-uid/test-uuid');
    expect(dbSpy.object('mensajes/test-owner-uid/test-uuid').set).toHaveBeenCalledWith({
      texto: 'Hola, me encantaría pasear a tu mascota Firulais.',
      nombreRemitente: 'Juan',
      apellidoRemitente: 'Perez',
      correoRemitente: 'juan@example.com',
      telefonoRemitente: '123456789',
      fechaEnvio: jasmine.any(String), // Validamos que sea un string sin necesidad de verificar el formato exacto
    });
  });
});
