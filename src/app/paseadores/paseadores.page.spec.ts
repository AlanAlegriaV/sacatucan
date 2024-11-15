import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaseadoresPage } from './paseadores.page';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PaseadoresPage', () => {
  let component: PaseadoresPage;
  let fixture: ComponentFixture<PaseadoresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaseadoresPage],
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {
            object: () => ({
              snapshotChanges: () => of({ payload: { val: () => ({}) } })
            })
          }
        },
        {
          provide: ModalController,
          useValue: {
            create: () => Promise.resolve({
              present: () => Promise.resolve(),
              onDidDismiss: () => Promise.resolve({})
            })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => Promise.resolve(true)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaseadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
