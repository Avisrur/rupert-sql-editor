const userInteractionsDB = require("../../db/user-interactions");
const { v4: uuidv4 } = require("uuid");
const { replaceNewLineWithSpace } = require("../../utils/replacer");

const handleUserInteractions = async (newQueryID, interactions) => {
  for (let interaction of interactions) {
    const newInteractionId = uuidv4();
    interaction.curQueryString = replaceNewLineWithSpace(interaction.curQueryString);
    await userInteractionsDB.createNewUserInteraction(newInteractionId, interaction, newQueryID);
  }
};

module.exports = { handleUserInteractions };
