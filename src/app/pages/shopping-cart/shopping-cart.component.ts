import { Component, inject } from '@angular/core';
import { OrderDetailsComponent } from '../../shared/components/order-details/order-details.component';
import { CheckoutCourseCardComponent } from '../../shared/components/checkout-course-card/checkout-course-card.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../shared/models/breadcrumb.interface';
import { CourseData } from '../../shared/models/courseData.interface';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    OrderDetailsComponent,
    CheckoutCourseCardComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  /**
   * Breadcrumb items for navigation display.
   */
  breadCrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Shopping cart' },
  ];

  coursesService = inject(CoursesService);
  router = inject(Router);

  /**
   * The list of courses that have been added to the shopping cart.
   * This is derived from the courses service by filtering for courses with `addToCart` set to true.
   */
  coursesAddedToCart: CourseData[] = this.coursesService.coursesAddedToCart;

  /**
   * The total price of the items in the shopping cart.
   */
  totalPrice: number = this.coursesService.totalPrice;

  /**
   * The total discounts of items in cart.
   */

  totalDiscount: number = this.coursesService.totalDiscount;

  onCheckout = () => {
    this.router.navigate(['/checkout']);
  };
}
