import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePaseadorPage } from './detalle-paseador.page';

describe('DetallePaseadorPage', () => {
  let component: DetallePaseadorPage;
  let fixture: ComponentFixture<DetallePaseadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePaseadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
