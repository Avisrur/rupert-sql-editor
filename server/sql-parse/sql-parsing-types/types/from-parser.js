class FromParser {
  constructor() {}

  parse(operationValue) {
    return operationValue.split(" ").join("").split(",");
  }
}

module.exports = FromParser;
