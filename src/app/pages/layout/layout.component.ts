import { RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import {
  CarCardComponent,
  HeaderComponent,
  MoneyCardComponent,
} from '@betlive/components';

import { CarouselComponent } from 'app/components/carousel/carousel.component';

const Components = [
  HeaderComponent,
  CarouselComponent,
  MoneyCardComponent,
  CarCardComponent,
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ...Components],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
