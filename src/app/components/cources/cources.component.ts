import { Component, inject } from '@angular/core';
import { HomeCourseCardComponent } from '../home-course-card/home-course-card.component';
import { CoursesService } from '../../core/services/courses/courses.service';
import { TabsModule } from 'primeng/tabs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CourseData } from '../../shared/models/courseData.interface';
import { Category } from '../../shared/models/category.interface';
import { Subscription } from 'rxjs';

/**
 * CourcesComponent
 * Displays a list of courses and allows filtering by categories.
 * Integrates with the CoursesService and CategoriesService to fetch data.
 */
@Component({
  selector: 'app-cources',
  imports: [HomeCourseCardComponent, TabsModule],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.scss',
})
export class CourcesComponent {
  /**
   * Instance of the CoursesService to fetch course data.
   */
  private courcesService = inject(CoursesService);

  /**
   * Instance of the CategoriesService to fetch category data.
   */
  private categoriesService = inject(CategoriesService);

  /**
   * Array of courses filtered to show only those displayed on the homepage.
   */
  courses$: CourseData[] = this.courcesService
    .courses()
    .filter((course: CourseData) => course.showOnHomepage === true);

  /**
   * Array of categories fetched from the CategoriesService.
   */
  categories$: Category[] = [];

  /**
   * Subscription object to manage active subscriptions.
   */
  subscription: Subscription = new Subscription();

  /**
   * Lifecycle hook that initializes the component.
   * Fetches the list of categories from the CategoriesService.
   */
  ngOnInit() {
    this.getCategories();
  }

  /**
   * Fetches the list of categories from the CategoriesService.
   * Updates the `categories$` array with the fetched data.
   */
  getCategories(): void {
    const categoriesSubscription = this.categoriesService
      .categories()
      .subscribe({
        next: (categories) => {
          this.categories$ = categories;
        },
      });
    this.subscription.add(categoriesSubscription);
  }

  /**
   * Filters the list of courses by the selected category ID.
   * @param categoryId - The ID of the category to filter by.
   * @returns A filtered list of courses.
   */
  filterCoursesByCategory(categoryId: string) {
    if (categoryId === '0') {
      return this.courses$;
    }
    return this.courses$.filter(
      (course: CourseData) => course.categoryID.toString() === categoryId
    );
  }

    /**
   * Lifecycle hook that cleans up subscriptions when the component is destroyed.
   * Ensures no memory leaks by unsubscribing from active subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
