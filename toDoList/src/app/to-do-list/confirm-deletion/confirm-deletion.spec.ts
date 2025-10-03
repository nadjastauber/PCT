import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletion } from './confirm-deletion';

describe('ConfirmDeletion', () => {
  let component: ConfirmDeletion;
  let fixture: ComponentFixture<ConfirmDeletion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeletion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
