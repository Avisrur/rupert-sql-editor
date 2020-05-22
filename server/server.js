const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use("/query", require("./controllers/query-controller"));
app.use("/suggestion", require("./controllers/suggestion-controller"));

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
