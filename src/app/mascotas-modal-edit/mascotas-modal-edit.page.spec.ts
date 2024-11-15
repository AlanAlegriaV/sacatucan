import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MascotasModalEditPage } from './mascotas-modal-edit.page';
import { NavParams, ModalController, IonicModule } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('MascotasModalEditPage', () => {
  let component: MascotasModalEditPage;
  let fixture: ComponentFixture<MascotasModalEditPage>;
  let mockNavParams: any;
  let mockModalController: any;
  let mockAngularFireDatabase: any;
  let mockAngularFireAuth: any;

  beforeEach(() => {
    // Mock de NavParams
    mockNavParams = {
      get: jasmine.createSpy('get').and.returnValue({
        nombre: 'Fido',
        edad: 3,
        sexo: 'Macho',
        descripcion: 'Un perro amistoso',
        imagenUrl: 'http://example.com/image.jpg',
        mascotaId: '12345'
      })
    };

    // Mock de ModalController
    mockModalController = jasmine.createSpyObj('ModalController', ['dismiss']);

    // Mock de AngularFireDatabase
    mockAngularFireDatabase = jasmine.createSpyObj('AngularFireDatabase', ['object']);
    mockAngularFireDatabase.object.and.returnValue({
      update: jasmine.createSpy('update').and.returnValue(Promise.resolve())
    });

    // Mock de AngularFireAuth
    mockAngularFireAuth = jasmine.createSpyObj('AngularFireAuth', ['currentUser']);
    mockAngularFireAuth.currentUser = Promise.resolve({ uid: 'test-uid' });

    TestBed.configureTestingModule({
      declarations: [MascotasModalEditPage],
      imports: [ReactiveFormsModule, FormsModule, IonicModule.forRoot()], // Importar IonicModule
      providers: [
        { provide: NavParams, useValue: mockNavParams },
        { provide: ModalController, useValue: mockModalController },
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MascotasModalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
