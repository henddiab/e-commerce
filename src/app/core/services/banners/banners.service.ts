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
  private http = inject(HttpClient);

  banners = toSignal(
    this.http
      .get<{ banners: banners[] }>(APIURL.Banners)
      .pipe(map((res) => res.banners)),
    { initialValue: [] }
  );
}
