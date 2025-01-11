import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlanerunnerPage } from './blanerunner.page';

describe('BlanerunnerPage', () => {
  let component: BlanerunnerPage;
  let fixture: ComponentFixture<BlanerunnerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlanerunnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
