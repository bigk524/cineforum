import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpiderManPage } from './spider-man.page';

describe('SpiderManPage', () => {
  let component: SpiderManPage;
  let fixture: ComponentFixture<SpiderManPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiderManPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
