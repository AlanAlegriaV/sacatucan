import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaseadoresPage } from './paseadores.page';

describe('PaseadoresPage', () => {
  let component: PaseadoresPage;
  let fixture: ComponentFixture<PaseadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
