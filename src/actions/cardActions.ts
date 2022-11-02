import { CONSTANTS } from ".";

export const addCard = (text: string, listId: number) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listId },
  };
};

export const changeCardText = (
  text: string,
  cardId: number,
  listId: number
) => {
  return {
    type: CONSTANTS.CHANGE_CARD_TEXT,
    payload: { text, cardId, listId },
  };
};

export const draggableSort = (
  sourceListId: string,
  destinationListId: string,
  sourceCardIndex: number,
  destinationCardIndex: number,
  draggableId: string
) => {
  return {
    type: CONSTANTS.DRAG_CARD,
    payload: {
      sourceListId,
      destinationListId,
      sourceCardIndex,
      destinationCardIndex,
      draggableId,
    },
  };
};