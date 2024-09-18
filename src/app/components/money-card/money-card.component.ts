import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import {
  HighlightTextPipe,
  HomePageDataService,
  MainCardData,
  ResizeService,
} from "@betlive/core";
import { map, withLatestFrom } from "rxjs";

@Component({
  selector: "app-money-card",
  imports: [CommonModule, MatCardModule, HighlightTextPipe],
  standalone: true,
  templateUrl: "./money-card.component.html",
  styleUrls: ["./money-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyCardComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  @Input() additionalTxt?: string;
  isMobile = signal(false);
  mainCardData = signal<MainCardData[]>([]);

  constructor(
    private resizeService: ResizeService,
    private homePageDataService: HomePageDataService
  ) {}

  ngOnInit(): void {
    this.getCarData();

    this.resizeService.isMobile$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((isMobile) => this.isMobile.set(isMobile));
  }

  getCarData() {
    this.homePageDataService
      .getMainCards()
      .pipe(
        map((data) => data.mainCardData),
        withLatestFrom(this.resizeService.isMobile$),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(([cardData, isMobile]) => {
        const filteredData = cardData.filter(
          (card: MainCardData) => card.group === "money"
        );

        this.mainCardData.set(filteredData);
        this.applyCollectedItems(isMobile);
      });
  }

  applyCollectedItems(isMobile: boolean) {
    const getRandomCollectedCount = (length: number) =>
      Math.floor(Math.random() * (length + 1));

    const updatedData = this.mainCardData().map((card) => {
      const collectItems = card.collect || [];
      const countCollected = getRandomCollectedCount(collectItems.length);

      return {
        ...card,
        collect: collectItems.map((item, index) => ({
          ...item,
          isCollected: index < countCollected,
        })),
      };
    });

    this.mainCardData.set(updatedData);
  }

  getCardClasses(card: MainCardData): string[] {
    const classes = ["custom-card"];
    if (card.name === "Bronze") {
      classes.push("bronze");
    } else if (card.name === "Gold") {
      classes.push("gold");
    }
    return classes;
  }

  getImageSrc(imagePath: string): string {
    return `assets/images/${imagePath}`;
  }

  getProgressImage(progress: any): string {
    return progress.isCollected
      ? this.getImageSrc(progress.imgCollected)
      : this.getImageSrc(progress.imgProgress);
  }
}
