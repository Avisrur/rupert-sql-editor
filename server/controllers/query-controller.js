const express = require("express");
const router = express.Router();
const pastQueriesDB = require("../db/past-queries");
const { handleNewQuery } = require("../utils/query-handler");

router.post("/submitQuery", submitQuery);
router.delete("/deleteQueryByQuery", deleteQueryByQuery);
router.delete("/deleteQueryById", deleteQueryById);

module.exports = router;

async function submitQuery(req, res, next) {
  console.log(req.body);
  let response;
  handleNewQuery(req.body.query);
  const { rows } = await pastQueriesDB.getQuery(req.body.query);
  console.log(rows);
  if (rows.length == 0) {
    response = await pastQueriesDB.saveNewQuery(req.body.query);
    console.log(response);
  } else {
    response = await pastQueriesDB.updateQuery(
      req.body.query,
      rows[0].used + 1
    );
  }
  res.status(201).send("Query added");
}

async function deleteQueryByQuery(req, res, next) {
  await pastQueriesDB.deleteQueryByQuery(req.body.query);
  res.status(201).send("Query deleted");
}

async function deleteQueryById(req, res, next) {
  await pastQueriesDB.deleteQueryById(req.body.id);
  res.status(201).send("Query deleted");
}
