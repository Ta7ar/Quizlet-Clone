import React, { Component } from "react";
import Modal from "./Modal";
import CardRow from "./CardRow";
const axios = require("axios").default;

class DeckCreator extends Component {
  state = {
    message: "",
    deck: [],
    currentCard: { question: "", answer: "" },
    AddCardModal: false,
    CreateDeckModal: false,
    deckName: "",
  };
  handleCardOps = (e, field) => {
    this.setState({
      currentCard: {
        ...this.state.currentCard,
        [field]: e.target.value.trim(),
      },
    });
  };

  addCard = (e) => {
    e.preventDefault();
    if (
      !this.state.currentCard.question.trim() ||
      !this.state.currentCard.answer.trim()
    )
      return this.setState({ message: "Fields Cannot be Empty" });

    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
    this.setState({
      deck: [...this.state.deck, this.state.currentCard],
      currentCard: { question: "", answer: "" },
      message: "",
    });
  };

  toggleAddCardModal = () => {
    this.setState({ AddCardModal: !this.state.AddCardModal });
  };
  toggleCreateDeckModal = () => {
    if (this.state.deck.length === 0)
      return this.setState({ message: "Cannot create deck with no cards" });
    this.setState({ message: "" });
    this.setState({ CreateDeckModal: !this.state.CreateDeckModal });
  };

  deleteCard = (index) => {
    var deckCopy = [...this.state.deck];
    deckCopy = deckCopy.filter((value, i) => {
      return i !== index;
    });
    this.setState({ deck: deckCopy }, () => {
      if (deckCopy.length === 0) return this.toggleAddCardModal();
    });
  };

  createDeck = () => {
    if (this.state.deckName.trim() === "")
      return this.setState({ message: "Name your deck" });
    if (this.state.deck.length === 0)
      return this.setState({ message: "Cannot create a deck with no cards" });
    if (this.state.deckName.trim().length > 25)
      return this.setState({ message: "Deck name is too long" });

    const jwt_token = localStorage.getItem("auth-token");
    const { deck, deckName } = this.state;
    axios
      .post(
        "api/createdeck",
        { deckName, deck },
        {
          headers: { "auth-token": jwt_token },
        }
      )
      .then((response) => {
        return this.setState({
          message: response.data,
          CreateDeckModal: false,
          deck: [],
        });
      })
      .catch((err) => {
        if (err) return this.setState({ message: err.response.data });
      });
  };

  render() {
    const { deck, message, AddCardModal, CreateDeckModal } = this.state;
    return (
      <div className="deck-creator">
        <div
          className="card-counter"
          onClick={() => {
            if (deck.length > 0) return this.toggleAddCardModal();
          }}
        >
          {deck.length}
        </div>
        <div className="form">
          <form>
            <label>
              Question
              <input
                id="question"
                type="text"
                onChange={(e) => {
                  this.handleCardOps(e, "question");
                }}
              ></input>
            </label>

            <label>
              Answer
              <input
                id="answer"
                onChange={(e) => {
                  this.handleCardOps(e, "answer");
                }}
                type="text"
              ></input>
            </label>
            <div>
              <button style={{ margin: "1rem" }} onClick={this.addCard}>
                Add Card
              </button>
              <button
                style={{ margin: "1rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleCreateDeckModal();
                }}
              >
                Create Deck
              </button>
            </div>
          </form>
        </div>

        {message && (
          <p style={{ textAlign: "center", padding: "1rem" }}>{message}</p>
        )}

        <Modal isOpen={AddCardModal} toggle={this.toggleAddCardModal}>
          {deck.map((val, i) => {
            return (
              <CardRow
                card={val}
                index={i}
                deleteCard={this.deleteCard}
              ></CardRow>
            );
          })}
        </Modal>
        <Modal isOpen={CreateDeckModal} toggle={this.toggleCreateDeckModal}>
          <form>
            <label>
              Deck Name:
              <br />
              <input
                type="text"
                style={{ marginTop: "1rem" }}
                onChange={(e) => {
                  this.setState({ deckName: e.target.value });
                }}
                placeholder="Maximum 25 characters"
              ></input>
            </label>
          </form>
          <button
            style={{
              marginTop: "1rem",
            }}
            onClick={this.createDeck}
          >
            Create Deck
          </button>
        </Modal>
      </div>
    );
  }
}

export default DeckCreator;
