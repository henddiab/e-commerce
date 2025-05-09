import { Component } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-checkout-course-card',
  imports: [RatingComponent],
  templateUrl: './checkout-course-card.component.html',
  styleUrl: './checkout-course-card.component.scss'
})
export class CheckoutCourseCardComponent {

}
