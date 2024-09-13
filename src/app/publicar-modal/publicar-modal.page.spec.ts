import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarModalPage } from './publicar-modal.page';

describe('PublicarModalPage', () => {
  let component: PublicarModalPage;
  let fixture: ComponentFixture<PublicarModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
