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
});
