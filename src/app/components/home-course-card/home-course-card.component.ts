import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CourseData } from '../../shared/models/courseData.interface';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/models/category.interface';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * HomeCourseCardComponent
 * Displays a course card with details such as title, rating, and category.
 * Fetches category data from the CategoriesService to display category names.
 */
@Component({
  selector: 'app-home-course-card',
  imports: [RatingComponent, RouterModule],
  templateUrl: './home-course-card.component.html',
  styleUrl: './home-course-card.component.scss',
})
export class HomeCourseCardComponent implements OnInit, OnDestroy {
  /**
   * Instance of the CategoriesService to fetch category data.
   */
  categoriesService = inject(CategoriesService);

  /**
   * Array of categories fetched from the CategoriesService.
   */
  categories$: Category[] = [];

  /**
   * Input property to receive course data from the parent component.
   */
  @Input() course: CourseData | undefined;

  /**
   * Subscription object to manage active subscriptions.
   */
  subscription: Subscription = new Subscription();

  /**
   * Lifecycle hook that initializes the component.
   * Fetches the list of categories on initialization.
   */
  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Fetches the list of categories from the CategoriesService.
   * Updates the `categories$` array with the fetched data.
   */
  getCategories(): void {
    const categoriesSubscription = this.categoriesService.categories().subscribe({
      next: (categories) => {
        this.categories$ = categories;
      },
    });
    this.subscription.add(categoriesSubscription);
  }

  /**
   * Retrieves the name of a category based on its ID.
   * @param categoryId - The ID of the category to find.
   * @returns The name of the category, or an empty string if not found.
   */
  getCategoryName(categoryId: number): string {
    const category = this.categories$.find(
      (category: Category) => category.id === categoryId.toString()
    );
    return category ? category.name : '';
  }

  /**
   * Lifecycle hook that cleans up subscriptions when the component is destroyed.
   * Ensures no memory leaks by unsubscribing from active subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
