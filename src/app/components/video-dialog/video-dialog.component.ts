import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnDestroy,
} from '@angular/core';
import { SafePipe } from '@betlive/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [SafePipe, MatDialogModule],
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDialogComponent implements OnDestroy {
  videoUrl: string;
  router = inject(Router);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { videoId: string }) {
    this.videoUrl = `https://www.youtube.com/embed/${this.data.videoId}`;
  }

  ngOnDestroy() {
    this.router.navigate(['/']);
  }
}
