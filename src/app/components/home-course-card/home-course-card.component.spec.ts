import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCourseCardComponent } from './home-course-card.component';

describe('HomeCourseCardComponent', () => {
  let component: HomeCourseCardComponent;
  let fixture: ComponentFixture<HomeCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCourseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
