const userInteractionsDB = require("../../services/user-interactions-service");
const { v4: uuidv4 } = require("uuid");
const { replaceNewLineWithSpace } = require("../../utils/replacer");

const handleUserInteractions = async (db, newQueryID, interactions) => {
  for (let interaction of interactions) {
    const newInteractionId = uuidv4();
    interaction.curQueryString = replaceNewLineWithSpace(interaction.curQueryString);
    await userInteractionsDB.createNewUserInteraction(db, newInteractionId, interaction, newQueryID);
  }
};

module.exports = { handleUserInteractions };
