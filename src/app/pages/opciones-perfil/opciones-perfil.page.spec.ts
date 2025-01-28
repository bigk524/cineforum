import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesPerfilPage } from './opciones-perfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('OpcionesPerfilPage', () => {
  let component: OpcionesPerfilPage;
  let fixture: ComponentFixture<OpcionesPerfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, NativeStorage]
    });
    fixture = TestBed.createComponent(OpcionesPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
