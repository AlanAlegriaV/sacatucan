import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionPaseadorPage } from './publicacion-paseador.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

describe('PublicacionPaseadorPage', () => {
  let component: PublicacionPaseadorPage;
  let fixture: ComponentFixture<PublicacionPaseadorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicacionPaseadorPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AngularFireAuth, useValue: { authState: of(null) } },
        { provide: AngularFireDatabase, useValue: jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']) },
        { provide: AngularFireStorage, useValue: jasmine.createSpyObj('AngularFireStorage', ['ref']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionPaseadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
