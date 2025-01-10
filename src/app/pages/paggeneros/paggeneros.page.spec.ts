import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaggenerosPage } from './paggeneros.page';

describe('PaggenerosPage', () => {
  let component: PaggenerosPage;
  let fixture: ComponentFixture<PaggenerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaggenerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
