import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VideoDialogComponent } from "../video-dialog/video-dialog.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-video-popup-handler",
  standalone: true,
  imports: [CommonModule, RouterModule, VideoDialogComponent],
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPopupHandlerComponent {
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    // ფუნქციებში აიდის გადაცემით დინამიური ხდება როუტიდან, თუ ცალკეული კომპონენტებიდან განსახვავებულ ვიდეოს შეგვიძლია მივწვდეთ. თუ სტატიკური გვაქვს ერთ ადგილას გავუწერთ
    this.openVideoDialog("YBVAzetyD44");
  }

  openVideoDialog(videoId: string) {
    this.dialog.open(VideoDialogComponent, {
      data: { videoId },
      width: "50rem",
      height: "450px",
    });
  }
}
