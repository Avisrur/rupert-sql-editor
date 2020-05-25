const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const pastQueriesDB = require("../db/past-queries");
const userInteractionsDB = require("../db/user-interactions");
const { handleNewQuery } = require("../utils/query-handler");

router.post("/submitQuery", submitQuery);
router.delete("/deleteQueryByQuery", deleteQueryByQuery);
router.delete("/deleteQueryById", deleteQueryById);

module.exports = router;

async function submitQuery(req, res, next) {
  let { query, interactions } = req.body.data;
  query = query.split("\n").join(" ");
  handleNewQuery(query);
  const newQueryID = uuidv4();
  await pastQueriesDB.saveNewQuery(newQueryID, query);
  for (let interaction of interactions) {
    let { curSqlClause, curQueryString, suggestion } = interaction;
    const newInteractionId = uuidv4();
    curQueryString = curQueryString.split("\n").join(" ");
    await userInteractionsDB.createNewUserInteraction(
      newInteractionId,
      curQueryString,
      curSqlClause,
      suggestion,
      newQueryID
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
