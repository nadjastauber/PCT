import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewToDo } from './update-new-to-do';

describe('UpdateNewToDo', () => {
  let component: UpdateNewToDo;
  let fixture: ComponentFixture<UpdateNewToDo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNewToDo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNewToDo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
