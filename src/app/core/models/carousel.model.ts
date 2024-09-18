export interface CarouselCardData {
  id: number;
  image: string;
  title: string;
  description?: string;
}

export interface CarouselCardResponse {
  carouselCards: CarouselCardData[];
}
