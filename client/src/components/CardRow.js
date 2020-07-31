import React from "react";

function CardRow({ card, index, deleteCard }) {
  const { question, answer } = card;
  return (
    <div style={{ padding: "1rem" }}>
      Question: {question}, Answer: {answer}
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteCard(index);
        }}
        style={{
          width: "2rem",
          height: "2rem",
          margin: "1rem",
          backgroundColor: "#F40000",
        }}
      >
        &#10006;
      </button>
    </div>
  );
}

export default CardRow;
