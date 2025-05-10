import { Component } from '@angular/core';
import { CourcesComponent } from "../../components/cources/cources.component";

@Component({
  selector: 'app-home',
  imports: [CourcesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
