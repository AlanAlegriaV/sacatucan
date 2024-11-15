import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePaseadorPage } from './detalle-paseador.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';

describe('DetallePaseadorPage', () => {
  let component: DetallePaseadorPage;
  let fixture: ComponentFixture<DetallePaseadorPage>;

  const mockAngularFireAuth = {
    authState: of({ uid: 'testUid' }),
  };

  const mockAngularFireDatabase = {
    object: jasmine.createSpy('object').and.callFake((path: string) => {
      if (path.includes('usuarios')) {
        return {
          valueChanges: () => of({ nombre: 'Test', apellido: 'User', correo: 'test@example.com', telefono: '123456789' }),
        };
      }
      return {
        valueChanges: () => of({ nombre: 'Paseador Test', apellido: 'Apellido Test', uid: 'testUid' }),
      };
    }),
    createPushId: () => 'mockMessageId',
  };

  const mockNavController = {
    back: jasmine.createSpy('back'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePaseadorPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase },
        { provide: NavController, useValue: mockNavController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePaseadorPage);
    component = fixture.componentInstance;

    // Simular la inicialización del paseador
    component.paseador = { nombre: 'Paseador Test', apellido: 'Apellido Test', uid: 'testUid' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
