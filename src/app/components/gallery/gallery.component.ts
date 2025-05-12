import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';

// import 'swiper/css/bundle';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  slides = [
    {
      id: 1,
      image:
        'https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI',
    },
    {
      id: 2,
      image:
        'https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc',
    },
    {
      id: 3,
      image:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
    },
    {
      id: 4,
      image:
        'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
    },
    {
      id: 5,
      image:
        'https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g',
    },
  ];
  activeIndex = 0;
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
        modules: [Pagination, Navigation, Grid],
        loop: true,
        slidesPerView: 1.8,
        centeredSlides: true,
        // centeredSlidesBounds: true,
        spaceBetween: 20,
        // watchSlidesProgress: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          // progressbarOpposite:true,
          clickable: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 5,
            spaceBetween: -400,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          },
        },
      });
    }
  }
}
