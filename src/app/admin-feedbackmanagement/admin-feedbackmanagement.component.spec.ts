import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackmanagementComponent } from './admin-feedbackmanagement.component';

describe('AdminFeedbackmanagementComponent', () => {
  let component: AdminFeedbackmanagementComponent;
  let fixture: ComponentFixture<AdminFeedbackmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFeedbackmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbackmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
