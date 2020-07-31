const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

dotenv.config();

/*
 **  Imported routes
 */
const registerRoute = require("./routes/registerUser");
const loginRoute = require("./routes/loginUser");
const createDeckRoute = require("./routes/createDeck");
const deckCollectionRoute = require("./routes/deckCollection");
const deleteDeckRoute = require("./routes/deleteDeck");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db...");
  })
  .catch((err) => {
    if (err) throw err;
    console.log("cannot connect to db...");
  });

app.use("/api/user", registerRoute);
app.use("/api/user", loginRoute);
app.use("/api/createdeck", createDeckRoute);
app.use("/api/decks", deckCollectionRoute);
app.use("/api/deletedeck", deleteDeckRoute);

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
