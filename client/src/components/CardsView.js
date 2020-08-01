import React, { useState } from "react";
import Card from "./Card";

function CardsView({ children: cards, toggle }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextCard = () => {
    if (currentIndex !== cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => {
      if (currentIndex !== 0){
          setCurrentIndex(currentIndex-1);
      }
  }
  return (
    <div className="cards-view">
      <button
        onClick={() => {
          toggle(false);
        }}
      >
        &#10006;
      </button>
        <div className="chevron left" onClick={previousCard}>
          &#x2039;
        </div>
        <Card>{cards[currentIndex]}</Card>
        <div className="chevron right" onClick={nextCard}>
          &#x203A;
        </div>
      
      <div className="current-card">{currentIndex + 1}</div>
    </div>
  );
}

export default CardsView;
