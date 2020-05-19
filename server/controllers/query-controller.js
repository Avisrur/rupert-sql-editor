const express = require("express");
const router = express.Router();

router.post("/submitQuery", submitQuery);

module.exports = router;

function submitQuery(req, res, next) {
  console.log(req.body);
  res.json(["bla", "blalala", "lalala"]);
}
