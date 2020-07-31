const mongoose = require('mongoose');
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    question: {type:String,required:true},
  
    answer: {type:String, required:true}
});

const deckSchema = new Schema({
    name: {type:String, required:true},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    cards: [cardSchema]
})

deckSchema.methods.addCard = function(card){
    this.cards.push(card)
    return this.save()
}

module.exports = Deck = mongoose.model('Deck',deckSchema);