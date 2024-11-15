import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of } from 'rxjs';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  const mockAngularFireAuth = {
    currentUser: Promise.resolve({ uid: 'testUID', email: 'test@example.com' }),
    authState: of({ uid: 'testUID', email: 'test@example.com' }),
  };

  const mockAngularFireDatabase = {
    object: () => ({
      valueChanges: () => of({
        nombre: 'Test',
        apellido: 'User',
        correo: 'test@example.com',
        telefono: '123456789',
        region: 'TestRegion',
        comuna: 'TestComuna'
      }),
      update: jasmine.createSpy('update'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
