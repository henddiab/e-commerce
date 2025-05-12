import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import { BannersService } from '../../core/services/banners/banners.service';
import { banners } from '../../shared/models/banners.interface';

@Component({
  selector: 'app-banners',
  imports: [CommonModule],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
})
export class BannersComponent {
  private bannerService = inject(BannersService);
  banners: banners[] = this.bannerService.banners();

  bannerSlider: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.bannerSlider = new Swiper('.banner-slider', {
        modules: [Pagination, Navigation, Grid],
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        centeredSlides: true,
        centeredSlidesBounds: true,
        watchSlidesProgress: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }
}
