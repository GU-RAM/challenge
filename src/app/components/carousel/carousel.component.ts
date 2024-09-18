import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarouselCardData } from '@betlive/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    TranslateModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  translate: TranslateService = inject(TranslateService);
  currentIndex = 0;
  @Input() carouselCards: CarouselCardData[] = [];
  itemWidth = 100;

  constructor(private cdr: ChangeDetectorRef) {}

  getTransform() {
    // return `translateX(-${this.currentIndex * (this.itemWidth / 2)}%)`;
  }

  next() {
    if (this.currentIndex < this.carouselCards.length - 2) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
