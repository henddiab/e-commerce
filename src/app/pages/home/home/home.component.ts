import { Component } from '@angular/core';
import { FooterComponent } from "../../../layout/footer/footer/footer.component";
import { HeaderComponent } from '../../../layout/header/header/header.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
