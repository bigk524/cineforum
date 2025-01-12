import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesPerfilPage } from './opciones-perfil.page';

describe('OpcionesPerfilPage', () => {
  let component: OpcionesPerfilPage;
  let fixture: ComponentFixture<OpcionesPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
