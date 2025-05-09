import { Component } from '@angular/core';
import { OrderDetailsComponent } from '../../shared/components/order-details/order-details.component';
import { CheckoutCourseCardComponent } from '../../shared/components/checkout-course-card/checkout-course-card.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

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
export class ShoppingCartComponent {}
