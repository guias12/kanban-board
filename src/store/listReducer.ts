import { IList } from "../models/types";
import { AnyAction } from "redux";
import { CONSTANTS } from "../actions";
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
    case CONSTANTS.ADD_CARD:
      const newState = state.map((list) => {
        if (list.id === action.payload.listId) {
          const newCardId = list.cards.length;
          const newCard = {
            text: action.payload.text,
            id: newCardId,
          };
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    case CONSTANTS.CHANGE_CARD_TEXT:
      let currentList = state.find(
        (list) => list.id === action.payload.listId
      );
      const currentListIndex = state.findIndex(
        (list) => list.id === action.payload.listId
      );
      const edditingCardIndex = currentList?.cards.findIndex(
        card => card.id === action.payload.cardId
      )

      if (edditingCardIndex && currentList) {
        let newCards = [...currentList.cards]
        newCards[edditingCardIndex].text = action.payload.text
        currentList = {
          ...currentList,
          cards: [...newCards]
        }

        const newState = state;
        newState[currentListIndex] = currentList
        return  newState
      }

      return state;
    default:
      return state;
  }
};

export default listReducer;
