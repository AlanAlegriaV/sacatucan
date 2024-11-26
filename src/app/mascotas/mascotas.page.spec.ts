import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotasPage } from './mascotas.page';
import { PublicarMascotaModalPage } from '../publicar-mascota-modal/publicar-mascota-modal.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of } from 'rxjs';

// Crea mocks de los servicios que se usan en MascotasPage
class MockModalController {
  create() {
    return {
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve({ data: null }),
    };
  }
}


class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('MascotasPage', () => {
  let component: MascotasPage;
  let fixture: ComponentFixture<MascotasPage>;
  let dbSpy: jasmine.SpyObj<AngularFireDatabase>;

  beforeEach(() => {
    // Mock para AngularFireDatabase
    const mockAngularFireDatabase = jasmine.createSpyObj('AngularFireDatabase', ['object']);
    const mockSnapshot = {
      payload: {
        val: () => ({
          ownerId1: {
            mascotaId1: { nombre: 'Firulais', raza: 'Labrador' },
          },
        }),
      },
    };

    mockAngularFireDatabase.object.and.returnValue({
      snapshotChanges: () => of(mockSnapshot), // Retornamos un observable con el mockSnapshot
    });

    TestBed.configureTestingModule({
      declarations: [MascotasPage],
      providers: [
        { provide: ModalController, useClass: MockModalController },
        { provide: Router, useClass: MockRouter },
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotasPage);
    component = fixture.componentInstance;
    dbSpy = TestBed.inject(AngularFireDatabase) as jasmine.SpyObj<AngularFireDatabase>;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule(); // Resetea el TestBed después de cada prueba
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las mascotas', () => {
    // Llama al método que queremos probar
    component.cargarMascotas();

    // Esperamos que se hayan cargado las mascotas
    expect(component.mascotas.length).toBe(1);
    expect(component.mascotas[0].nombre).toBe('Firulais');
    expect(component.mascotas[0].raza).toBe('Labrador');

    // Verificamos que se llamó a la base de datos con el nodo correcto
    expect(dbSpy.object).toHaveBeenCalledWith('mascotas');
  });

  it('debería abrir el modal para publicar una nueva mascota', async () => {
    const modalController = TestBed.inject(ModalController); // Inyectamos el mock
    const createSpy = spyOn(modalController, 'create').and.callThrough(); // Espiamos el método create
  
    await component.abrirModalMascota(); // Llamamos al método que queremos probar
  
    expect(createSpy).toHaveBeenCalled(); // Verificamos que se llamó a create
  });  
  
});
