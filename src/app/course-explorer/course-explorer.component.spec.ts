import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExplorerComponent } from './course-explorer.component';

describe('CourseExplorerComponent', () => {
  let component: CourseExplorerComponent;
  let fixture: ComponentFixture<CourseExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
