import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  progressValue = signal<number>(0);
  tooltipText = signal<string>('არაფერია არჩეული');

  updateProgressAndTooltip(progress: number, tooltipText: string): void {
    this.progressValue.set(progress);
    this.tooltipText.set(`შენი პროგრესი ${tooltipText}-ზე`);
  }
}
