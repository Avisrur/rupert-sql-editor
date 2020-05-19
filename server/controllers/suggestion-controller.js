const express = require("express");
const router = express.Router();

router.post("/tablesName", tablesName);
router.post("/columnsName", columnsName);

module.exports = router;

function tablesName(req, res, next) {
  console.log(req.body);
  res.json(["corona", "countries"]);
}

function columnsName(req, res, next) {
  console.log(req.body);
  res.json(["country_id", "countries"]);
}
