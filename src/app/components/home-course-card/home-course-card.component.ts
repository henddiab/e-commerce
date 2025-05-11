import { Component, inject, Input } from '@angular/core';
import { CourseData } from '../../shared/models/courseData.interface';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/models/category.interface';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-course-card',
  imports: [RatingComponent, RouterModule],
  templateUrl: './home-course-card.component.html',
  styleUrl: './home-course-card.component.scss',
})
export class HomeCourseCardComponent {
  categoriesService = inject(CategoriesService);
  categories$: Category[] = [];
  @Input() course: CourseData | undefined;

  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getCatregories();
  }

  getCatregories(): void {
    this.categoriesService.categories().subscribe({
      next: (categories) => {
        this.categories$ = categories;
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories$.find(
      (category: Category) => category.id === categoryId.toString()
    );
    return category ? category.name : '';
  }
}
