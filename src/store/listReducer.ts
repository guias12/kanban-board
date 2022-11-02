import { IList } from "../models/types";
import { AnyAction } from "redux";
const initialState: IList[] = [
  {
    title: "To Do",
    id: 0,
    cards: [
      {
        id: 0,
        text: "lorem ipsum",
      },
      {
        id: 1,
        text: "lorem ipsum dolor",
      },
      {
        id: 2,
        text: "abc",
      },
      {
        id: 3,
        text: "def",
      },
    ],
  },
  {
    title: "Doing",
    id: 1,
    cards: [
      {
        id: 0,
        text: "Wash dishes",
      },
      {
        id: 1,
        text: "Clean room",
      },
    ],
  },
  {
    title: "Done",
    id: 2,
    cards: [
      {
        id: 0,
        text: "Walk with the dog",
      },
      {
        id: 1,
        text: "Eat meal",
      },
    ],
  },
];

const listReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default listReducer;
