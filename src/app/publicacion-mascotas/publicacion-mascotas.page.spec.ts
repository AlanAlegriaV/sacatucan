import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionMascotasPage } from './publicacion-mascotas.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

describe('PublicacionMascotasPage', () => {
  let component: PublicacionMascotasPage;
  let fixture: ComponentFixture<PublicacionMascotasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicacionMascotasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AngularFireAuth, useValue: { authState: of(null) } },
        { provide: AngularFireDatabase, useValue: jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']) },
        { provide: AngularFireStorage, useValue: jasmine.createSpyObj('AngularFireStorage', ['ref']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionMascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
