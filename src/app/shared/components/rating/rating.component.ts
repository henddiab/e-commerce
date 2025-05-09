import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rate: number = 0;
  readonly maxStars = 5;

  get fullStars(): number[] {
    return Array(Math.floor(this.rate)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.rate % 1 >= 0.25 && this.rate % 1 < 0.75;
  }

  get emptyStars(): number[] {
    const full = Math.floor(this.rate);
    const half = this.hasHalfStar ? 1 : 0;
    return Array(this.maxStars - full - half).fill(0);
  }
}
