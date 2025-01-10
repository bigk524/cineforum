import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BanusuariosPage } from './banusuarios.page';

describe('BanusuariosPage', () => {
  let component: BanusuariosPage;
  let fixture: ComponentFixture<BanusuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BanusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
