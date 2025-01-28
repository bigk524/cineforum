import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelPage } from './admin-panel.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminPanelPage', () => {
  let component: AdminPanelPage;
  let fixture: ComponentFixture<AdminPanelPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    fixture = TestBed.createComponent(AdminPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
