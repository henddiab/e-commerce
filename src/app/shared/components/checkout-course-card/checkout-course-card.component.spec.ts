import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCourseCardComponent } from './checkout-course-card.component';

describe('CheckoutCourseCardComponent', () => {
  let component: CheckoutCourseCardComponent;
  let fixture: ComponentFixture<CheckoutCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCourseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
