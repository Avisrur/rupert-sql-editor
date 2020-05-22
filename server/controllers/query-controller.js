const express = require("express");
const router = express.Router();
const pastQueriesDB = require("../db/past-queries");

router.post("/submitQuery", submitQuery);

module.exports = router;

async function submitQuery(req, res, next) {
  console.log(req.body);
  const { rows } = await pastQueriesDB.getQuery(req.body.query);
  if (rows.length == 0) {
    await pastQueriesDB.saveQuery(req.body.query);
  } else {
    await pastQueriesDB.updateQuery(req.body.query);
  }
  // if(rows)
  // res.status(201).send(`Query added with ID: ${result.insertId}`)
}
