const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const pastQueriesService = require("../services/past-queries-service");
const { handleUserInteractions } = require("../handlers/interactions/user-interactions-handler");
const { handleNewQuery } = require("../handlers/query/query-handler");
const { replaceNewLineWithSpace } = require("../utils/replacer");
const { getDB } = require("../utils/getter");

router.post("/submitQuery", submitQuery);

module.exports = router;

async function submitQuery(req, res, next) {
  let { query, interactions } = req.body.data;
  const newQueryID = uuidv4();
  query = replaceNewLineWithSpace(query);
  await handleNewQuery(getDB(req), query);
  await pastQueriesService.saveNewQuery(getDB(req), newQueryID, query);
  await handleUserInteractions(getDB(req), newQueryID, interactions);
  res.status(201).send("Query added");
}
