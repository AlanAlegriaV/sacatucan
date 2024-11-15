import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotasPage } from './mascotas.page';
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

class MockAngularFireDatabase {
  object() {
    return {
      valueChanges: () => of({}) // Retorna un observable vacío o un mock de datos si necesitas
    };
  }
}

describe('MascotasPage', () => {
  let component: MascotasPage;
  let fixture: ComponentFixture<MascotasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasPage],
      providers: [
        { provide: ModalController, useClass: MockModalController },
        { provide: Router, useClass: MockRouter },
        { provide: AngularFireDatabase, useClass: MockAngularFireDatabase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
