import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPublicacionPage } from './crear-publicacion.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CrearPublicacionPage', () => {
  let component: CrearPublicacionPage;
  let fixture: ComponentFixture<CrearPublicacionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    fixture = TestBed.createComponent(CrearPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
