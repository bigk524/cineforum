import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OppenheimerPage } from './oppenheimer.page';

describe('OppenheimerPage', () => {
  let component: OppenheimerPage;
  let fixture: ComponentFixture<OppenheimerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OppenheimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
