import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressBarService } from '../services';
import { TooltipOnclickDirective } from '@betlive/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    TooltipOnclickDirective,
    MatIconModule,
  ],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  breakpoints: string[] = ['50C', '150C', '300C', '400C', '500C', '1000C'];
  isTooltipVisible: boolean = false;

  constructor(public progressBarService: ProgressBarService) {}

  get progress(): number {
    return this.progressBarService.progressValue();
  }

  get tooltipText(): string {
    return this.progressBarService.tooltipText();
  }
}
