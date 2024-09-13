import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarMascotaModalPage } from './publicar-mascota-modal.page';

describe('PublicarMascotaModalPage', () => {
  let component: PublicarMascotaModalPage;
  let fixture: ComponentFixture<PublicarMascotaModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarMascotaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
