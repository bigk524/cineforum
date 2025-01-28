import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, NativeStorage,
        {
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
        }
      ],
    });
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
