class OnParser {
  constructor() {}

  parse(operationValue) {
    let onValues = operationValue.split(" ").join("");
    let onNewValues = [];
    if (onValues.includes("=")) onNewValues = onValues.split("=");
    return [...onNewValues];
  }
}

module.exports = OnParser;
