import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionPaseadorPage } from './publicacion-paseador.page';

describe('PublicacionPaseadorPage', () => {
  let component: PublicacionPaseadorPage;
  let fixture: ComponentFixture<PublicacionPaseadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionPaseadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
