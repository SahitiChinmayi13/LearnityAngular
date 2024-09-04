import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchuserComponent } from './admin-searchuser.component';

describe('AdminSearchuserComponent', () => {
  let component: AdminSearchuserComponent;
  let fixture: ComponentFixture<AdminSearchuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSearchuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSearchuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
