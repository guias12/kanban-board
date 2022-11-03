import React, { useState, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { changeCardText } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ICard } from '../../models/types';
import './styles.scoped.scss';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps {
  card: ICard;
  id: number;
  index: number;
  listId: number;
  dispatch: any;
}
const Card = ({ card, id, index, listId, dispatch }: ICardProps) => {
  const [cardText, setCardText] = useState<string>(card.text);
  const [isEdittingCard, setIsEdditingCard] = useState<boolean>(false);

  const toggleIsEdditingCard = (): void => {
    setIsEdditingCard(true);
  };

  const handleInputKeydow = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveNewCardText();
    }
  };

  const saveNewCardText = (): void => {
    setIsEdditingCard(false);
    if (cardText) {
      dispatch(changeCardText(cardText, id, listId));
    }
  };

  const cancelEdittingMode = (): void => {
    setIsEdditingCard(false);
    setCardText(card.text);
  };
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className="card-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEdittingCard ? (
            <div className="card-input-container">
              <input
                type="text"
                value={cardText}
                onChange={(e) => setCardText(e.target.value)}
                onKeyDown={handleInputKeydow}
                autoFocus
                className="card-text-input"
              />
              <FontAwesomeIcon
                onClick={saveNewCardText}
                className="save-icon"
                icon={faSave}
              />
              <FontAwesomeIcon
                onClick={cancelEdittingMode}
                className="cancel-icon"
                icon={faTimes}
              />
            </div>
          ) : (
            <span className="card-text" onClick={toggleIsEdditingCard}>
              {card.text}
            </span>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default connect()(Card);
