import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PelistendenciasPage } from './pelistendencias.page';

describe('PelistendenciasPage', () => {
  let component: PelistendenciasPage;
  let fixture: ComponentFixture<PelistendenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PelistendenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
