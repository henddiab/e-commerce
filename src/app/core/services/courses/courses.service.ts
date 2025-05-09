import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { CourseData } from '../../../shared/models/courseData.interface';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private http = inject(HttpClient);

  courses = toSignal(
    this.http
      .get<{ Courses: CourseData[] }>(APIURL.Courses)
      .pipe(map((res) => res.Courses)),
    { initialValue: [] }
  );

  getCourseById(id: string) {
    return this.courses().find((course) => course.id === id);
  }
}
