import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajePage } from './mensaje.page';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

// Mocks
const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: () => 'mockParam', // Simula un parámetro de ruta
    },
  },
};

const angularFireAuthMock = {
  authState: of({ uid: 'mockUid', email: 'mockEmail@example.com' }), // Simula un usuario autenticado
};

const angularFireDatabaseMock = {
  list: () => ({
    valueChanges: () => of([]), // Simula una lista vacía en la base de datos
  }),
};

const navControllerMock = {
  back: jasmine.createSpy('back'), // Simula el método "back" del NavController
};

describe('MensajePage', () => {
  let component: MensajePage;
  let fixture: ComponentFixture<MensajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensajePage],
      imports: [IonicModule.forRoot()], // Importamos el módulo de Ionic
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseMock },
        { provide: NavController, useValue: navControllerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MensajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
