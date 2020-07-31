import React, { useState } from "react";

function Card({ children: { question, answer } }) {
  const [flipped, toggleFlip] = useState(false);

  return (
    <div
      className={`card ${flipped ? "flip" : ""}`}
      onClick={() => {
        toggleFlip(!flipped);
      }}
    >
      <div className="front">
        <h4>{question}</h4>
      </div>
      <div className="back">
        <h4>{answer}</h4>
      </div>
    </div>
  );
}

export default Card;
