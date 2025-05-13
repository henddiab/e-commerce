import {
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import Swiper from 'swiper';
import { GalleryService } from '../../core/services/gallery/gallery.service';

/**
 * GalleryComponent
 * Displays a Swiper slider with a gallery of images.
 * Includes custom navigation, autoplay, and a progress bar.
 */
@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  /**
   * Injects the GalleryService to fetch gallery data.
   */
  private galleryService = inject(GalleryService);

  /**
   * Array of slides fetched from the GalleryService.
   */
  slides = this.galleryService.gallery();

  /**
   * Index of the currently active slide.
   */
  activeIndex: any  = 0;

  /**
   * Percentage of progress for the custom progress bar.
   */
  progressPercentage: number = 0;

  /**
   * Instance of the Swiper slider.
   */
  gallerySwiper: Swiper | undefined;

  /**
   * Injects the platform ID to ensure browser-specific logic.
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Lifecycle hook that initializes the component.
   * Ensures the Swiper slider is only initialized in the browser environment.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSwiper();
      }, 1000);
    }
  }

  /**
   * Handles the slide change event.
   * Updates the active index when the slide changes.
   * @param event - The Swiper event containing the real index of the slide.
   */
  onSlideChange(event: any) {
    this.activeIndex = event.realIndex;
  }

  /**
   * Navigates to the previous slide.
   */
  slidePrev() {
    this.gallerySwiper?.slidePrev();
  }

  /**
   * Navigates to the next slide.
   */
  slideNext() {
    this.gallerySwiper?.slideNext();
  }

  /**
   * Lifecycle hook that runs after the view is initialized.
   * Currently unused but reserved for future logic.
   */
  ngAfterViewInit() {}

  /**
   * Initializes the Swiper slider with custom configurations.
   * Includes autoplay, navigation, and responsive breakpoints.
   */
  initSwiper() {
    this.gallerySwiper = new Swiper('.gallerySwiper', {
      slidesPerView: 1.3,
      spaceBetween: 20,
      loop: false,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 3.8,
          spaceBetween: -300,
          centeredSlides: true,
          loop: true,
        },
      },
      on: {
        slideChange: () => {
          this.activeIndex = this.gallerySwiper?.realIndex;
          this.updateProgress();
        },
      },
    });
    this.updateProgress();
  }

  /**
   * Updates the custom progress bar based on the current slide index.
   */
  updateProgress() {
    if (this.gallerySwiper) {
      this.activeIndex = this.gallerySwiper.realIndex || 0;
      const totalSlides = this.gallerySwiper.slides.length;
      this.progressPercentage = ((this.activeIndex + 1) / totalSlides) * 100;
    }
  }
}
