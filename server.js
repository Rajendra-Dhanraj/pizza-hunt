const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose"); // connects to mongoose when app is started

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", { //  tells Mongoose which database we want to connect to. 
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
