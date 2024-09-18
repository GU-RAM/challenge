export interface CollectItem {
  isCollected: boolean;
  imgProgress: string;
  imgCollected: string;
  amount: number;
}

export interface MainCardData {
  id: number;
  group: string;
  name: string;
  headerLeftTxt: string;
  headerRightTxt: string;
  headerImageSrcLeft: string;
  headerImageSrcRight: string;
  collect: CollectItem[];
  img: string;
  collectedImg: string;
  mobileImg: string;
}

export const MAIN_CARD_DATA_OBJ: MainCardData = {
  id: 0,
  group: '',
  name: '',
  headerLeftTxt: '',
  headerRightTxt: '',
  headerImageSrcLeft: '',
  headerImageSrcRight: '',
  collect: [
    {
      isCollected: false,
      imgProgress: '',
      imgCollected: '',
      amount: 0,
    },
  ],
  img: '',
  collectedImg: '',
  mobileImg: '',
};

export const COLLECT_ITEMS = {
  isCollected: false,
  imgProgress: '',
  imgCollected: '',
  amount: 0,
};
