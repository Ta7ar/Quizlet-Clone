const router = require("express").Router();
const auth = require("./utils/verifyToken");

const Deck = require("./../models/deck");
const User = require("./../models/user");

router.post("/", auth, (req, res) => {
  const { _id: deck_id } = req.body;
  const { _id: user_id } = req.user;

  /* delete the deck reference in User document*/
  User.findOneAndUpdate({_id:user_id}, {$pull :{decks: deck_id}}).then((user)=>{
      /*delete deck document*/
      Deck.deleteOne({_id: deck_id}).then((deck)=>{
          res.status(200).send("Success");
      }).catch((err)=>{
          res.status(500).send("MongoDB error");
      })
  }).catch((err)=>{
      res.status(500).send("MongoDB Error");
  })
});

module.exports = router;
