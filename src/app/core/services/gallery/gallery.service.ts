import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIURL } from '../http/api';
import { map } from 'rxjs';
import { gallery } from '../../../shared/models/gallery.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  /**
   * HttpClient instance for making HTTP requests.
   * This is injected using Angular's dependency injection system.
   */
  private http = inject(HttpClient);

  /**
   * Signal that holds the list of gallery items fetched from the API.
   * The signal is initialized with an empty array and updated with the API response.
   */
  gallery = toSignal(
    this.http
      .get<{ Slider: gallery[] }>(APIURL.Gallery)
      .pipe(map((res) => res.Slider)),
    { initialValue: [] }
  );
}
