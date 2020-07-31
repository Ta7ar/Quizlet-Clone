const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  decks: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
});

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password,10);
  next();
});


module.exports = User = mongoose.model("User", userSchema);
