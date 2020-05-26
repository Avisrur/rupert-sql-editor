const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const pastQueriesDB = require("../db/past-queries");
const { handleUserInteractions } = require("../handlers/interactions/user-interactions-handler");
const { handleNewQuery } = require("../handlers/query/query-handler");
const { replaceNewLineWithSpace } = require("../utils/replacer");

router.post("/submitQuery", submitQuery);

module.exports = router;

async function submitQuery(req, res, next) {
  let { query, interactions } = req.body.data;
  const newQueryID = uuidv4();
  query = replaceNewLineWithSpace(query);
  await handleNewQuery(query);
  await pastQueriesDB.saveNewQuery(newQueryID, query);
  await handleUserInteractions(newQueryID, interactions);
  res.status(201).send("Query added");
}
