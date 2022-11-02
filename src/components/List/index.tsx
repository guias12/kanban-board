import React, { useState } from "react";
import Card from "../Card";
import { ICard } from "../../models/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles.scoped.scss";

interface IListProps {
  title: string;
  id: number;
  cards: ICard[];
}

const List = ({ title, id, cards }: IListProps) => {
  const [creatingCard, setCreatingCard] = useState(false);
  const [newCardText, setNewCardText] = useState("");

  const toggleCardCreation = (status: boolean): void => {
    setCreatingCard(status);

    if (!status) {
      setNewCardText("");
    }
  };
  return (
    <div className="list-container">
      <h3>{title}</h3>
      {cards.map((card) => (
        <Card card={card} id={card.id} key={card.id} />
      ))}
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
            <button className="add-card-btn">Add card</button>
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
    </div>
  );
};

export default List;