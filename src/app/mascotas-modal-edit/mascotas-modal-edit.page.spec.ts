import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotasModalEditPage } from './mascotas-modal-edit.page';

describe('MascotasModalEditPage', () => {
  let component: MascotasModalEditPage;
  let fixture: ComponentFixture<MascotasModalEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasModalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
