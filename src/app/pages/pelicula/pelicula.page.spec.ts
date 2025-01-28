import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculaPage } from './pelicula.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('PeliculaPage', () => {
  let component: PeliculaPage;
  let fixture: ComponentFixture<PeliculaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, NativeStorage, {
        provide: ActivatedRoute, 
        useValue: {
          snapshot: {
            paramMap: {
              get(): string {
                return '1';
              }
            }
          }
        }
      }],
    });
    fixture = TestBed.createComponent(PeliculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
