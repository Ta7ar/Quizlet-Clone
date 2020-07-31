const router = require("express").Router();
const auth = require("./utils/verifyToken");

const Deck = require("./../models/deck");
const User = require("./../models/user");

router.get("/",auth,(req,res)=>{
    const {_id} = req.user;
    User.findById(_id).populate('decks').exec().then((user)=>{
        res.send(user.decks);
    }).catch((err)=>{
        res.status(500).send([]);
    })
})

module.exports = router;