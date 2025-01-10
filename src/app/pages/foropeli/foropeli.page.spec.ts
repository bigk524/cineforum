import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForopeliPage } from './foropeli.page';

describe('ForopeliPage', () => {
  let component: ForopeliPage;
  let fixture: ComponentFixture<ForopeliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForopeliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
