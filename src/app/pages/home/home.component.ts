import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CarouselCardData, HomePageDataService } from '@betlive/core';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CarouselService } from 'app/core/services/carousel.service';
import { ProductsAndProgressComponent } from './products-and-progress/products-and-progress.component';
import {
  CarCardComponent,
  CarouselComponent,
  HeaderComponent,
  MoneyCardComponent,
  VideoDialogComponent,
} from '@betlive/components';

const Modules = [
  CommonModule,
  MatCardModule,
  TranslateModule,
  MatButtonModule,
  RouterOutlet,
];
const Components = [
  HeaderComponent,
  CarouselComponent,
  MoneyCardComponent,
  CarCardComponent,
  ProductsAndProgressComponent,
];
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...Modules, ...Components],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  translate: TranslateService = inject(TranslateService);
  #destroyRef = inject(DestroyRef);
  carouselCards: CarouselCardData[] = [];
  id: string | null = null;

  constructor(
    private dialog: MatDialog,
    private carouselService: CarouselService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarouselData();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params) => {
        this.id = params.get('id');
      });
  }

  getCarouselData() {
    this.carouselService
      .getCarouselCards()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(
        (data) => {
          this.carouselCards = data.carouselCards;
        },
        (error) => {
          console.error('Error fetching card data', error);
        }
      );
  }

  openVideoDialog(videoId: string) {
    this.dialog.open(VideoDialogComponent, {
      data: { videoId },
      width: '50rem',
      height: '450px',
    });
  }
}
