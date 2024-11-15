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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleMascotaPage],
      providers: [
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase() },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth() },
        { provide: ActivatedRoute, useValue: mockActivatedRoute() },
        { provide: NavController, useValue: mockNavController() },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Mock para AngularFireDatabase
function mockAngularFireDatabase() {
  return {
    object: jasmine.createSpy('object').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({ nombre: 'Test User', apellido: 'Test Last' })),
    }),
    createPushId: jasmine.createSpy('createPushId').and.returnValue('test-uuid')
  };
}

// Mock para AngularFireAuth
function mockAngularFireAuth() {
  return {
    authState: of({ uid: 'test-uid', email: 'test@test.com' })
  };
}

// Mock para ActivatedRoute
function mockActivatedRoute() {
  return {
    queryParams: of({ mascota: JSON.stringify({ uid: 'test-uid', nombre: 'Firulais' }) })
  };
}

// Mock para NavController
function mockNavController() {
  return {
    back: jasmine.createSpy('back')
  };
}
