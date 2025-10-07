import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoArchiv } from './to-do-archiv';

describe('ToDoArchiv', () => {
  let component: ToDoArchiv;
  let fixture: ComponentFixture<ToDoArchiv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoArchiv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoArchiv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
