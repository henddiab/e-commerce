import { Component, inject } from '@angular/core';
import { HomeCourseCardComponent } from '../home-course-card/home-course-card.component';
import { CoursesService } from '../../core/services/courses/courses.service';
import { TabsModule } from 'primeng/tabs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CourseData } from '../../shared/models/courseData.interface';
import { Category } from '../../shared/models/category.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cources',
  imports: [HomeCourseCardComponent, TabsModule],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.scss',
})
export class CourcesComponent {
  private courcesService = inject(CoursesService);
  private categoriesService = inject(CategoriesService);

  courses$: CourseData[] = this.courcesService
    .courses()
    .filter((course: CourseData) => course.showOnHomepage === true);

  categories$: Category[] = [];

  ngOnInit() {
    this.categoriesService.categories().subscribe((categories) => {
      this.categories$ = categories;
    });
  }

  filterCoursesByCategory(categoryId: string) {
    if (categoryId === '0') {
      return this.courses$;
    }
    return this.courses$.filter(
      (course: CourseData) => course.categoryID.toString() === categoryId
    );
  }
}
