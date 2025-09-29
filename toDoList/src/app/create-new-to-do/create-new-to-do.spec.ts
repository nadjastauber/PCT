import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewToDo } from './create-new-to-do';

describe('CreateNewToDo', () => {
  let component: CreateNewToDo;
  let fixture: ComponentFixture<CreateNewToDo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewToDo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewToDo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
