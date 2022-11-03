import { IInitialState } from '../models/types';
import { AnyAction } from 'redux';
import { CONSTANTS } from '../actions';

const initialState: IInitialState = {
  searchTerm: '',
  list: [
    {
      title: 'To Do',
      id: 0,
      cards: [
        {
          id: 0,
          text: 'Test kanban board',
        },
      ],
    },
    {
      title: 'Doing',
      id: 1,
      cards: [],
    },
    {
      title: 'Done',
      id: 2,
      cards: [],
    },
  ],
};
let nextAvailableCardId = 1;

const listReducer = (state = initialState, action: AnyAction) => {
  const stateClone: IInitialState = { ...state };

  switch (action.type) {
    case CONSTANTS.ADD_CARD:
      const newStateList = stateClone.list.map((list) => {
        if (list.id === action.payload.listId) {
          const newCardId = nextAvailableCardId;
          const newCard = {
            text: action.payload.text,
            id: newCardId,
          };
          nextAvailableCardId += 1;

          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      stateClone.list = newStateList;
      state.list = newStateList;
      return stateClone;
    case CONSTANTS.CHANGE_CARD_TEXT:
      const { listId, cardId, text } = action.payload;
      let currentList = stateClone.list.find((list) => list.id === listId);
      const currentListIndex = stateClone.list.findIndex(
        (list) => list.id === listId
      );
      const edditingCardIndex = currentList?.cards.findIndex(
        (card) => card.id === cardId
      );

      if (
        (edditingCardIndex || edditingCardIndex === 0) &&
        (currentList || currentList === 0)
      ) {
        let newCards = [...currentList.cards];
        newCards[edditingCardIndex].text = text;
        currentList = {
          ...currentList,
          cards: [...newCards],
        };

        stateClone.list[currentListIndex] = currentList;
        return stateClone;
      }

      return state;
    case CONSTANTS.DRAG_CARD:
      const {
        sourceListId,
        destinationListId,
        sourceCardIndex,
        destinationCardIndex,
      } = action.payload;

      if (sourceListId === destinationListId) {
        const list = stateClone.list.find(
          (list) => sourceListId === String(list.id)
        );
        const card = list?.cards.splice(sourceCardIndex, 1);

        if (card) {
          list?.cards.splice(destinationCardIndex, 0, ...card);
        }
      } else {
        const sourceList = stateClone.list.find(
          (list) => sourceListId === String(list.id)
        );
        const card = sourceList?.cards.splice(sourceCardIndex, 1);
        const destinationList = stateClone.list.find(
          (list) => destinationListId === String(list.id)
        );
        if (card) {
          destinationList?.cards.splice(destinationCardIndex, 0, ...card);
        }
      }

      return stateClone;
    case CONSTANTS.FILTER_CARD:
      const { searchTerm } = action.payload;
      stateClone.searchTerm = searchTerm;

      return stateClone;
    default:
      return state;
  }
};

export default listReducer;
