import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  translate: TranslateService = inject(TranslateService);
  isHeaderBelowThreshold: boolean = false;
  private cdr = inject(ChangeDetectorRef);
  private readonly threshold: number = 0;
  private scrollSubscription: Subscription | undefined;

  ngOnInit() {
    this.setupScrollListener();
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  setupScrollListener() {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(debounceTime(50))
      .subscribe(() => this.checkHeaderPosition());
  }

  checkHeaderPosition() {
    const header = document.querySelector('header');
    if (header) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      this.isHeaderBelowThreshold = scrollTop > this.threshold;
      this.cdr.markForCheck();
    }
  }

  translateText(lang: string) {
    this.translate.use(lang);
  }
}
