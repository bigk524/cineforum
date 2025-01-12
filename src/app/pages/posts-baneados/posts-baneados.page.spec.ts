import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsBaneadosPage } from './posts-baneados.page';

describe('PostsBaneadosPage', () => {
  let component: PostsBaneadosPage;
  let fixture: ComponentFixture<PostsBaneadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsBaneadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
