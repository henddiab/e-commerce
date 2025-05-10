import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  @Input() onCheckout: () => void = () => {};
  @Input() totalPrice: number = 0;
  @Input() totalDiscount: number = 0;
  tax: number = 20.0;
}
