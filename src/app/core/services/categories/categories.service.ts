import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { map } from 'rxjs';
import { Category } from '../../../shared/models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  /**
   * HttpClient instance for making HTTP requests.
   * This is injected using Angular's dependency injection system.
   */
  private http = inject(HttpClient);

  /**
   * Signal that holds the list of categories fetched from the API.
   * The signal is initialized with an empty array and updated with the API response.
   */
  categories = toSignal(
    this.http
      .get<{ Categories: Category[] }>(APIURL.Categories)
      .pipe(map((res) => res.Categories)),
    { initialValue: [] }
  );
}
