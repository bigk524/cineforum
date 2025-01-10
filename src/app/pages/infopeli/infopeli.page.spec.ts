import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfopeliPage } from './infopeli.page';

describe('InfopeliPage', () => {
  let component: InfopeliPage;
  let fixture: ComponentFixture<InfopeliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopeliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
