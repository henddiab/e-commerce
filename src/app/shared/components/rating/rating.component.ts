import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rate: number = 0;
  readonly maxStars = 5;
  readonly maxRate = 200;

  get adjustedRate(): number {
    return (this.rate / this.maxRate) * this.maxStars;
  }

  get fullStars(): number[] {
    return Array(Math.floor(this.adjustedRate));
  }

  get hasHalfStar(): boolean {
    return this.adjustedRate % 1 >= 0.5;
  }
}
