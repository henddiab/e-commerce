import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CompletedOrderComponent } from './pages/completed-order/completed-order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: 'completed', component: CompletedOrderComponent },
  { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
];
