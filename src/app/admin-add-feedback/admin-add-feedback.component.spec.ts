import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFeedbackComponent } from './admin-add-feedback.component';

describe('AdminAddFeedbackComponent', () => {
  let component: AdminAddFeedbackComponent;
  let fixture: ComponentFixture<AdminAddFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
