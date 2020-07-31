import React, { useState } from "react";
import CardsView from "./CardsView";
const axios = require("axios").default;

function DeckTile({ children, getDecks }) {
  const { name, cards, _id } = children;
  const [popover, togglePopover] = useState(false);
  const [cardView, toggleCardView] = useState(false);

  const deleteDeck = (e) => {
    e.stopPropagation();
    togglePopover(!popover);
  };

  const deleteDeckConfirmed = (e) => {
    e.stopPropagation();
    const jwt_token = localStorage.getItem("auth-token");
    axios
      .post(
        "api/deletedeck",
        { _id },
        {
          headers: { "auth-token": jwt_token },
        }
      )
      .then((res) => {
        getDecks();
      })
      .catch((err) => {
        if (err) throw err;
      });
    togglePopover(false);
  };

  if (cardView) return <CardsView  toggle={toggleCardView}>{cards}</CardsView>;
  return (
    <div
      className="deck-tile-container"
      style={{ display: "inline-block", position: "relative" }}
    >
      <div onClick={()=>{toggleCardView(true)}} className="deck-tile">
        <p>{name}</p>
        <button onClick={deleteDeck}>&#10006;</button>
      </div>
      {popover && (
        <button className="popover" onClick={deleteDeckConfirmed}>
          Delete Deck
        </button>
      )}
    </div>
  );
}

export default DeckTile;
