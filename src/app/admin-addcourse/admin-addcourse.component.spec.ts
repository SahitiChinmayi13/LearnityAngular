import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcourseComponent } from './admin-addcourse.component';

describe('AdminAddcourseComponent', () => {
  let component: AdminAddcourseComponent;
  let fixture: ComponentFixture<AdminAddcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddcourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
