import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIntroductionComponent } from './admin-introduction.component';

describe('AdminIntroductionComponent', () => {
  let component: AdminIntroductionComponent;
  let fixture: ComponentFixture<AdminIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
