import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TendenciasPage } from './tendencias.page';

describe('TendenciasPage', () => {
  let component: TendenciasPage;
  let fixture: ComponentFixture<TendenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TendenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
