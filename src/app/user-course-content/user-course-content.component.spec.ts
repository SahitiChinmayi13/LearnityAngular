import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseContentComponent } from './user-course-content.component';

describe('UserCourseContentComponent', () => {
  let component: UserCourseContentComponent;
  let fixture: ComponentFixture<UserCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCourseContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
