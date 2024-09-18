import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import {
  CollectItem,
  HighlightTextPipe,
  HomePageDataService,
  MAIN_CARD_DATA_OBJ,
  MainCardData,
} from "@betlive/core";
import { ResizeService } from "app/core/services/resizer.service";
import { map } from "rxjs";

@Component({
  selector: "app-car-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, HighlightTextPipe],
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarCardComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  isMobile = signal(false);
  mainCardData = signal<MainCardData>(MAIN_CARD_DATA_OBJ);
  carCollect: CollectItem[] = [];
  additionalTxt: string = "რაღაცა გაუთვალისწინებელი ტექსტი";

  constructor(
    private resizeService: ResizeService,
    private homePageDataService: HomePageDataService
  ) {}

  ngOnInit(): void {
    this.getCarData();

    this.resizeService.isMobile$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((isMobile) => {
        this.isMobile.set(isMobile);
      });
  }

  getCarData() {
    this.homePageDataService
      .getMainCards()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        map((data) => {
          const filteredData = data.mainCardData.filter(
            (card: MainCardData) => card.group === "car"
          );

          if (filteredData.length) {
            const amount = filteredData[0].collect.amount;
            const carCollect = Array(amount).fill({
              ...filteredData[0].collect,
            });
            return { filteredData: filteredData[0], carCollect };
          }

          return { filteredData: null, carCollect: [] };
        })
      )
      .subscribe(({ filteredData, carCollect }) => {
        if (filteredData) {
          this.mainCardData.set(filteredData);
        }
        this.carCollect = carCollect;

        this.applyCollectedItems();
      });
  }

  applyCollectedItems() {
    function getRandomCollectedCount(length: number): number {
      return Math.floor(Math.random() * (length + 1));
    }

    const collectItems = this.mainCardData().collect;
    const countCollected = getRandomCollectedCount(collectItems.length);

    this.carCollect = collectItems.map((item: any, index: number) => ({
      ...item,
      isCollected: index < countCollected,
    }));
  }

  getImageSrc(imagePath: string): string {
    return `assets/images/${imagePath}`;
  }

  geMainImage(mobile: boolean) {
    return !mobile
      ? this.getImageSrc(this.mainCardData().img)
      : this.getImageSrc(this.mainCardData().mobileImg);
  }

  getProgressImage(progress: CollectItem): string {
    return progress.isCollected
      ? this.getImageSrc(progress.imgCollected)
      : this.getImageSrc(progress.imgProgress);
  }
}
