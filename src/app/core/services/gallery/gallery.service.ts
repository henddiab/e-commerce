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
  private http = inject(HttpClient);

  gallery = toSignal(
    this.http
      .get<{ gallery: gallery[] }>(APIURL.Gallery)
      .pipe(map((res) => res.gallery)),
    { initialValue: [] }
  );
}
