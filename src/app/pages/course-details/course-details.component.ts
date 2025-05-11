import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../core/services/courses/courses.service';
import { CourseData } from '../../shared/models/courseData.interface';
import { RatingComponent } from '../../shared/components/rating/rating.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../shared/models/breadcrumb.interface';

@Component({
  selector: 'app-course-details',
  imports: [RatingComponent, BreadcrumbComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  /**
   * Breadcrumb items for navigation display.
   * Dynamically updated based on the course data.
   */
  breadCrumbItems: BreadcrumbItem[] = [];

  /**
   * ActivatedRoute instance to access route parameters.
   */
  private route = inject(ActivatedRoute);

  /**
   * CoursesService instance to fetch course data.
   */
  private courseService = inject(CoursesService);

  /**
   * Course ID extracted from the route parameters.
   */
  private id = this.route.snapshot.paramMap.get('id')!;

  /**
   * Course data fetched from the service based on the course ID.
   */
  courseData: CourseData | undefined;

  ngOnInit() {
    // Fetch course data using the course ID
    this.courseData = computed(() =>
      this.courseService.getCourseById(this.id)
    )();

    // Update breadcrumb items based on the course data
    this.breadCrumbItems = [
      { label: 'Home', url: '/' },
      { label: this.courseData?.title || 'title' },
    ];
  }
}
