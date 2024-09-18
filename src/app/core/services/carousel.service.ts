import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CarouselCardResponse } from '../models/carousel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private http = inject(HttpClient);

  private dataUrl = 'assets/carouselcards.json';

  constructor() {}

  getCarouselCards(): Observable<CarouselCardResponse> {
    return this.http.get<CarouselCardResponse>(`${this.dataUrl}`);
  }
}
