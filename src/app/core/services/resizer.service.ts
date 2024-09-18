import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private isMobileSubject = new BehaviorSubject<boolean>(this.isMobile());

  isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        map(() => this.isMobile())
      )
      .subscribe((isMobile) => this.isMobileSubject.next(isMobile));
  }

  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
