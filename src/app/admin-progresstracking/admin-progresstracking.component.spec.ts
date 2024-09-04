import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgresstrackingComponent } from './admin-progresstracking.component';

describe('AdminProgresstrackingComponent', () => {
  let component: AdminProgresstrackingComponent;
  let fixture: ComponentFixture<AdminProgresstrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProgresstrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProgresstrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
