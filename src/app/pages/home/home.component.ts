import { Component } from '@angular/core';
import { CourcesComponent } from "../../components/cources/cources.component";
import { BannersComponent } from '../../components/banners/banners.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';

@Component({
  selector: 'app-home',
  imports: [CourcesComponent,BannersComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
