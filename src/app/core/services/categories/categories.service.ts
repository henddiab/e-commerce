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
  private http = inject(HttpClient);

  categories = toSignal(
    this.http
      .get<{ Categories: Category[] }>(APIURL.Categories)
      .pipe(map((res) => res.Categories)),
    { initialValue: [] }
  );
}
