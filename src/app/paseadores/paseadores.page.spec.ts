import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaseadoresPage } from './paseadores.page';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PaseadoresPage', () => {
  let component: PaseadoresPage;
  let fixture: ComponentFixture<PaseadoresPage>;
  let dbSpy: any;

  beforeEach(async () => {
    dbSpy = {
      object: jasmine.createSpy('object').and.returnValue({
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(
          of({
            payload: {
              val: () => ({
                testUID: {
                  nombre: 'John Doe',
                  experiencia: '2 años'
                }
              })
            }
          })
        )
      })
    };

    await TestBed.configureTestingModule({
      declarations: [PaseadoresPage],
      providers: [
        { provide: AngularFireDatabase, useValue: dbSpy },
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

  it('debería cargar paseadores desde Firebase', () => {
    component.cargarPaseadores();
    expect(dbSpy.object).toHaveBeenCalledWith('paseadores');
    expect(component.paseadores.length).toBe(1);
    expect(component.paseadores[0].nombre).toBe('John Doe');
  });
});
