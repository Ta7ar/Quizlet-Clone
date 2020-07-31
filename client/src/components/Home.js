import React, { useEffect, useState } from "react";
import Card from "./Card";
import DeckTile from "./DeckTile";
import Spinner from "./Spinner";
const axios = require("axios").default;

function Home({ isLoggedIn }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDecks = () => {
    const jwt_token = localStorage.getItem("auth-token");
    axios
      .get("/api/decks", {
        headers: { "auth-token": jwt_token },
      })
      .then((res) => {
        setDecks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
  useEffect(getDecks, []);
  if (!isLoggedIn) {
    return (
      <div>
        <Card>
          {{
            question: "Click Me to get started!",
            answer:
              "Create an account, log in, make your deck of cards and use them!",
          }}
        </Card>
      </div>
    );
  }

  return (
    <div className="home" style={{ padding: "1rem" }}>
      {loading && <Spinner />}
      {decks.map((deck) => {
        return <DeckTile getDecks={getDecks}>{deck}</DeckTile>;
      })}
    </div>
  );
}

export default Home;
