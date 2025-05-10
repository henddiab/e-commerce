import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { OrderDetailsComponent } from '../../shared/components/order-details/order-details.component';
import { BreadcrumbItem } from '../../shared/models/breadcrumb.interface';
import { RouterModule } from '@angular/router';
import { CoursesService } from '../../core/services/courses/courses.service';
@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    OrderDetailsComponent,
    RouterModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  /**
   * The total price of the items in the shopping cart.
   */
  totalPrice: number = 0;

  /**
   * The total discounts of items in cart.
   */

  totalDiscount: number = 0;
  /**
   * Breadcrumb items for navigation display.
   */
  breadCrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Shopping cart', url: '/shopping-cart' },
    { label: 'Checkout' },
  ];

  /**
   * Reactive form group for the checkout form.
   */
  checkoutForm: FormGroup;

  /**
   * Flag to toggle between the checkout form and confirmation view.
   */
  showConfirmation: boolean = false;

  /**
   * Constructor to initialize the form group with validation rules.
   * @param fb - FormBuilder instance for creating the reactive form.
   */
  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
    this.totalDiscount = this.coursesService.totalDiscount;
    this.totalPrice = this.coursesService.totalPrice;

    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      cardName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)],
      ],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/),
        ],
      ],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  /**
   * Navigates back to the checkout form by toggling the confirmation view off.
   */
  backToForm() {
    this.showConfirmation = false;
  }

  /**
   * Proceeds to the confirmation view by toggling the checkout form off.
   * This method is triggered when the "Proceed to Checkout" button is clicked.
   */
  proceedToCheckout = () => {
    if (this.checkoutForm.valid) {
      this.showConfirmation = true;
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  };
}
