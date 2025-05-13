import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { catchError, map, of, take } from 'rxjs';
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
   * Fetches the list of categories from the API.
   * If a server error occurs, a fallback dummy array of categories is returned.
   *
   * @returns An observable that emits the list of categories.
   */
  categories() {
    return this.http.get<{ Categories: Category[] }>(APIURL.Categories).pipe(
      map((res) => res.Categories),
      catchError((error) => {
        return of([
          { id: '0', name: 'All' },
          { id: '1', name: 'Development' },
          { id: '2', name: 'Data Science' },
          { id: '3', name: 'DevOps' },
          { id: '4', name: 'Cloud Computing' },
        ]);
      }),
      take(1)
    );
  }
}
