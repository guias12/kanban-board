import React from "react";
import { ICard } from "../../models/types";
import "./styles.scoped.scss";

interface ICardProps {
  card: ICard;
  id: number;
}
const Card = ({ card, id }: ICardProps) => {
  return (
    <div className="card-container">
      <span className="card-text">{card.text}</span>
    </div>
  );
};

export default Card;
