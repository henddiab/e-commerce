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
import { Pagination, Navigation, Grid } from 'swiper/modules';
import { GalleryService } from '../../core/services/gallery/gallery.service';

// import 'swiper/css/bundle';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  private galleryService = inject(GalleryService);
  slides = this.galleryService.gallery();
  activeIndex: any = 0;
  progressPercentage: number = 0;
  gallerySwiper: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
      this.initSwiper()
      }, 1000);
    }
  }


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

  }

  initSwiper(){
    this.gallerySwiper = new Swiper('.gallerySwiper', {
        slidesPerView: 1.3,
        spaceBetween: 20,
        loop: false,
        autoplay:{
          delay:2000
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

  updateProgress() {
    if (this.gallerySwiper) {
      this.activeIndex = this.gallerySwiper.realIndex || 0;
      const totalSlides = this.gallerySwiper.slides.length;
      this.progressPercentage = ((this.activeIndex + 1) / totalSlides) * 100;
    }
  }

}
