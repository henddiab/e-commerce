import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import { GalleryService } from '../../core/services/gallery/gallery.service';

// import 'swiper/css/bundle';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private galleryService = inject(GalleryService);
  slides = this.galleryService.gallery();
  activeIndex: any = 0;
  gallerySwiper: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onSlideChange(event: any) {
    this.activeIndex = event.realIndex;
  }
  slidePrev() {
    this.gallerySwiper?.slidePrev();
  }
  slideNext() {
    this.gallerySwiper?.slideNext();
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.gallerySwiper = new Swiper('.gallerySwiper', {
        slidesPerView: 1.3,
        spaceBetween: 20,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true,
        },
        navigation: {
          nextEl: '.gallery-next',
          prevEl: '.gallery-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 3,
            spaceBetween: -400,
            centeredSlides: true,
            loop: true,
          },
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.gallerySwiper?.realIndex;
          },
        },
      });
    }
  }
}
