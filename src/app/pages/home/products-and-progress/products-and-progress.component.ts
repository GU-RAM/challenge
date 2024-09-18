import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { Product } from '../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PRODUCTS_PROGRESS } from 'app/core/constants/constants';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarService } from '../services';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-and-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProgressBarComponent,
    TranslateModule,
  ],
  templateUrl: './products-and-progress.component.html',
  styleUrls: ['./products-and-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsAndProgressComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  @Input() pathId: string = '';
  @Output() pathIdChange = new EventEmitter<string>();
  private router = inject(Router);
  products: Product[] = PRODUCTS_PROGRESS;
  activeProduct: string | null = null;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit() {
    const savedProduct = localStorage.getItem('activeProduct');
    if (savedProduct) {
      this.activeProduct = savedProduct;
    }
  }

  sendPathId() {
    this.pathIdChange.emit(this.pathId);
  }

  getProductTypesName(name: string): void {
    this.router.navigate([`main/${name}`]);

    this.activeProduct = name;

    localStorage.setItem('activeProduct', name);

    const newProgress = Math.floor(Math.random() * 100) + 1;
    const newTooltipText = name;

    this.progressBarService.updateProgressAndTooltip(
      newProgress,
      newTooltipText
    );
  }

  isActive(product: string): boolean {
    return this.activeProduct === product;
  }
}
