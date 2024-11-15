import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarMascotaModalPage } from './publicar-mascota-modal.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

describe('PublicarMascotaModalPage', () => {
  let component: PublicarMascotaModalPage;
  let fixture: ComponentFixture<PublicarMascotaModalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicarMascotaModalPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AngularFireAuth, useValue: { authState: of(null) } },
        { provide: AngularFireDatabase, useValue: jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']) },
        { provide: AngularFireStorage, useValue: jasmine.createSpyObj('AngularFireStorage', ['ref']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarMascotaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
