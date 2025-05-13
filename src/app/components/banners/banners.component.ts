import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import { BannersService } from '../../core/services/banners/banners.service';
import { banners } from '../../shared/models/banners.interface';
import { SafeHtmlPipe } from '../../shared/pipes/SafeHtml.pipe';

@Component({
  selector: 'app-banners',
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
})
export class BannersComponent implements OnInit {
  private bannerService = inject(BannersService);
  banners: banners[] = this.bannerService.banners();

  bannerSlider: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.bannerSlider = new Swiper('.banner-slider', {
          modules: [Pagination, Navigation, Grid],
          loop: true,
          slidesPerView: 1,
          centeredSlides: true,
          centeredSlidesBounds: true,
          watchSlidesProgress: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => {
              const banner = this.banners[index % this.banners.length]; // Handle looping banners
              const color = banner?.colorCode || '000000'; // Fallback to black if no colorCode
              return `<span class="${className}" style="background-color: #${color};"></span>`;
            },
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      }, 1000);
    }
  }

  ngAfterViewInit() {}

  getTitle(title: any, colorCode: any): string {
    if (!title || !colorCode) {
      return title || ''; // Return the title as-is if no colorCode is provided
    }
    console.log(
      title.replace(
        /<span>(.*?)<\/span>/g,
        `<span style="color: #${colorCode};">$1</span>`
      )
    );

    return title.replace(
      /<span>(.*?)<\/span>/g,
      `<span style="color: #${colorCode};">$1</span>`
    );
  }
}
