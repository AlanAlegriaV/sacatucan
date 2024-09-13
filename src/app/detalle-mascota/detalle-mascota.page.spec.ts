import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMascotaPage } from './detalle-mascota.page';

describe('DetalleMascotaPage', () => {
  let component: DetalleMascotaPage;
  let fixture: ComponentFixture<DetalleMascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
