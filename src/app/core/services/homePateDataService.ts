import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomePageDataService {
  private dataUrl = 'assets/maincard.json';

  constructor(private http: HttpClient) {}

  getMainCards(): Observable<any> {
    return this.http.get<any>(`${this.dataUrl}`);
  }
}
