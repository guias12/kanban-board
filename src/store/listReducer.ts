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
        id: 4,
        text: "Wash dishes",
      },
      {
        id: 5,
        text: "Clean room",
      },
    ],
  },
  {
    title: "Done",
    id: 2,
    cards: [
      {
        id: 6,
        text: "Walk with the dog",
      },
      {
        id: 7,
        text: "Eat meal",
      },
    ],
  },
];
let nextAvailableCardId = 8


const listReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD:
      const newState = state.map((list) => {
        if (list.id === action.payload.listId) {
          const newCardId = nextAvailableCardId;
          const newCard = {
            text: action.payload.text,
            id: newCardId,
          };
          nextAvailableCardId +=1;

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
    case CONSTANTS.DRAG_CARD:
      const {
        sourceListId,
        destinationListId,
        sourceCardIndex,
        destinationCardIndex,
        draggableId,
      } = action.payload
      const stateCopy = [...state]
      
      if (sourceListId === destinationListId) {
        const list = state.find(list => sourceListId === String(list.id))
        const card = list?.cards.splice(sourceCardIndex, 1)

        if (card) {
          list?.cards.splice(destinationCardIndex, 0, ...card)
        }
      }

      return stateCopy
    default:
      return state;
  }
};

export default listReducer;
