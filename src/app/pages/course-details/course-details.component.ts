import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../core/services/courses/courses.service';
import { CourseData } from '../../shared/models/courseData.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-details',
  imports: [],
  providers: [HttpClient],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CoursesService);

  private id = this.route.snapshot.paramMap.get('id')!;

  courseData: any;

  ngOnInit() {
    this.courseData = computed(() =>
      this.courseService.getCourseById(this.id)
    )();
  }
}
