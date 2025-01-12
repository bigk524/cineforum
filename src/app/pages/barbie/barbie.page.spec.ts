import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarbiePage } from './barbie.page';

describe('BarbiePage', () => {
  let component: BarbiePage;
  let fixture: ComponentFixture<BarbiePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
