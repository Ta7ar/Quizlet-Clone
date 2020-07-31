const router = require("express").Router();
const auth = require("./utils/verifyToken");

const Deck = require("./../models/deck");
const User = require("./../models/user");

router.post("/",auth, (req, res) => {
  const { deckName, deck } = req.body;
  Deck.create({ name: deckName, cards: deck ,author: req.user._id})
    .then((deck) => {
      User.findOneAndUpdate(
        
        { _id: req.user._id },
        { $push: { decks: deck._id } }
      )
        .then((user) => {
          return res.status(200).send("Deck Created");
        })
        .catch((err) => {
          return res.status(500).send(`User does not exist/ MongoDB error: ${err}`);
        });
        
    })
    .catch((err) => {
      return res.status(500).send(`MongoDB Atlas server error: ${err}`);
    });
});

module.exports = router;