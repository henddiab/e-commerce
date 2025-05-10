import { Component } from '@angular/core';
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
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, BreadcrumbComponent, OrderDetailsComponent,RouterModule,NgClass],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  breadCrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Shopping cart', url: '/shopping-cart' },
    { label: 'Checkout' },
  ];
  checkoutForm: FormGroup;
  showConfirmation: boolean = false;

  constructor(private fb: FormBuilder) {
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

  backToForm(){
    this.showConfirmation = false;
  }

  proceedToCheckout = () => {
    this.showConfirmation = true;
    // if (this.checkoutForm.valid) {
    //   console.log(this.checkoutForm.value);
    // } else {
    //   this.checkoutForm.markAllAsTouched();
    // }
  };
}
