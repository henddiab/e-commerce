import { Component, Input } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { CourseData } from '../../models/courseData.interface';

@Component({
  selector: 'app-checkout-course-card',
  imports: [RatingComponent],
  templateUrl: './checkout-course-card.component.html',
  styleUrl: './checkout-course-card.component.scss',
})
export class CheckoutCourseCardComponent {
  @Input() course: CourseData | undefined;
}
