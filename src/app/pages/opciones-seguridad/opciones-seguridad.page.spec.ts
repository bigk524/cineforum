import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesSeguridadPage } from './opciones-seguridad.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from 'src/app/services/db.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('OpcionesSeguridadPage', () => {
  let component: OpcionesSeguridadPage;
  let fixture: ComponentFixture<OpcionesSeguridadPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, NativeStorage],
    });
    fixture = TestBed.createComponent(OpcionesSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe aprobar contraseña nueva si la contraseña es igual a la de la confirmacion', () => {
    component.oldPassword = '123456';
    component.newPassword = '@Cine123456';
    component.newPasswordTest = '@Cine123456';
    expect(component.validarAux()).toBeTruthy();    
  });

  it('debe rechazar contraseñas repetidas', () => {
    component.oldPassword = '@Cine123456';
    component.newPassword = '@Cine123456'
    component.newPasswordTest = '@Cine123456|';
    expect(component.validarAux()).toBeFalsy();
  });

  it('debe rechazar contraseñas que no cumplen los requerimientos minimos', () => {
    component.oldPassword = '123456';
    component.newPassword = '123';
    component.newPasswordTest = '123'; 
    expect(component.validarAux()).toBeFalsy();  
  })
});
