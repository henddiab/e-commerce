import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { map } from 'rxjs';
import { banners } from '../../../shared/models/banners.interface';
@Injectable({
  providedIn: 'root',
})
export class BannersService {
  /**
   * HttpClient instance for making HTTP requests.
   * This is injected using Angular's dependency injection system.
   */
  private http = inject(HttpClient);

  /**
   * Signal that holds the list of banners fetched from the API.
   * The signal is initialized with an empty array and updated with the API response.
   */
  banners = toSignal(
    this.http
      .get<{ banners: banners[] }>(APIURL.Banners)
      .pipe(map((res) => res.banners)),
    { initialValue: [] }
  );
}
