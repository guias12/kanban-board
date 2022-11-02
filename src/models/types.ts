export interface ICard {
  id: number;
  text: string;
}

export interface IList {
  title: string;
  id: number;
  cards: ICard[];
}
