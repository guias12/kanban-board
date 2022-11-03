import React, { useState } from 'react';
import Card from '../Card';
import { ICard } from '../../models/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';
import './styles.scoped.scss';
import { connect } from 'react-redux';
import { addCard } from '../../actions';
interface IListProps {
  title: string;
  id: number;
  cards: ICard[];
  searchTerm: string;
  dispatch: any;
}

const List = ({ title, id, cards, searchTerm, dispatch }: IListProps) => {
  const [creatingCard, setCreatingCard] = useState(false);
  const [newCardText, setNewCardText] = useState('');

  const toggleCardCreation = (status: boolean): void => {
    setCreatingCard(status);

    if (!status) {
      setNewCardText('');
    }
  };

  const handleAddCard = () => {
    if (newCardText) {
      dispatch(addCard(newCardText, id));
    }
    setCreatingCard(false);
    setNewCardText('');
  };
  return (
    <Droppable droppableId={`${id}`}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="list-container"
        >
          <h3>{title}</h3>
          {cards.map((card, index) => {
            if (searchTerm !== '') {
              if (card.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                return (
                  <Card
                    card={card}
                    listId={id}
                    id={card.id}
                    key={card.id}
                    index={index}
                  />
                );
              } else {
                return null;
              }
            } else {
              return (
                <Card
                  card={card}
                  listId={id}
                  id={card.id}
                  key={card.id}
                  index={index}
                />
              );
            }
          })}
          {creatingCard ? (
            <div className="new-card-container">
              <input
                type="text"
                name="new-card-text"
                id="new-card-text"
                className="new-card-text"
                placeholder="Add new card text"
                value={newCardText}
                onChange={(e) => setNewCardText(e.target.value)}
                autoFocus
              />
              <div className="new-card-buttons">
                <button className="add-card-btn" onClick={handleAddCard}>
                  Add card
                </button>
                <button
                  className="cancel-add-btn"
                  onClick={() => toggleCardCreation(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="list-add-card-btn"
              type="button"
              onClick={() => toggleCardCreation(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create new card
            </button>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default connect()(List);
