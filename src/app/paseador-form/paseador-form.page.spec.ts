import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaseadorFormPage } from './paseador-form.page';

describe('PaseadorFormPage', () => {
  let component: PaseadorFormPage;
  let fixture: ComponentFixture<PaseadorFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseadorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
