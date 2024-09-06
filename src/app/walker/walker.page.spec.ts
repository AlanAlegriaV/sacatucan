import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalkerPage } from './walker.page';

describe('WalkerPage', () => {
  let component: WalkerPage;
  let fixture: ComponentFixture<WalkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
