import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { CourseData } from '../../../shared/models/courseData.interface';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  /**
   * HttpClient instance for making HTTP requests.
   */
  private http = inject(HttpClient);

  /**
   * Signal that holds the list of courses fetched from the API.
   * The signal is initialized with an empty array and updated with the API response.
   */
  courses = toSignal(
    this.http
      .get<{ Courses: CourseData[] }>(APIURL.Courses)
      .pipe(map((res) => res.Courses)),
    { initialValue: [] }
  );

  /**
   * The list of courses that have been added to the shopping cart.
   * This is derived from the courses service by filtering for courses with `addToCart` set to true.
   */
  coursesAddedToCart: CourseData[] = this.courses().filter(
    (course) => course.addToCart
  );

  /**
   * The total price of the items in the shopping cart.
   */
  totalPrice: number = this.coursesAddedToCart.reduce(
    (acc, course: CourseData) => acc + (course.price - course.discount),
    0
  );

  /**
   * The total discounts of items in cart.
   */

  totalDiscount: number = this.coursesAddedToCart.reduce(
    (acc, course: CourseData) => acc + course.discount,
    0
  );

  /**
   * Retrieves a course by its ID.
   * @param id - The unique identifier of the course.
   * @returns The course data if found, otherwise `undefined`.
   */
  getCourseById(id: string) {
    return this.courses().find((course) => course.id === id);
  }
}
