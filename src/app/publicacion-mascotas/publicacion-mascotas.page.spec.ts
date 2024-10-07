import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionMascotasPage } from './publicacion-mascotas.page';

describe('PublicacionMascotasPage', () => {
  let component: PublicacionMascotasPage;
  let fixture: ComponentFixture<PublicacionMascotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionMascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
