import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import { BannersService } from '../../core/services/banners/banners.service';
import { banners } from '../../shared/models/banners.interface';
import { SafeHtmlPipe } from '../../shared/pipes/SafeHtml.pipe';

/**
 * BannersComponent
 * Displays a Swiper slider with dynamic banners fetched from the BannersService.
 * Includes custom pagination and navigation functionality.
 */
@Component({
  selector: 'app-banners',
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss',
})
export class BannersComponent implements OnInit {
  /**
   * Injects the BannersService and platform ID for browser-specific logic.
   */
  private bannerService = inject(BannersService);
  /**
   * Array of banners fetched from the BannersService.
   */
  banners: banners[] = this.bannerService.banners();

  /**
   * Instance of the Swiper slider.
   */
  bannerSlider: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lifecycle hook that initializes the component.
   * Ensures the slider is only initialized in the browser environment.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiper();
    }
  }

  /**
   * Initializes the Swiper slider with custom configurations.
   * Includes autoplay, pagination, and navigation settings.
   */
  initSwiper() {
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

  /**
   * Generates a styled HTML string for the banner title.
   * Dynamically applies the colorCode to the <span> elements in the title.
   *
   * @param title - The title string containing <span> elements.
   * @param colorCode - The color code to apply to the <span> elements.
   * @returns A string with the styled HTML content.
   */
  getTitle(title: any, colorCode: any): string {
    if (!title || !colorCode) {
      return title || ''; // Return the title as-is if no colorCode is provided
    }

    return title.replace(
      /<span>(.*?)<\/span>/g,
      `<span style="color: #${colorCode};">$1</span>`
    );
  }
}
