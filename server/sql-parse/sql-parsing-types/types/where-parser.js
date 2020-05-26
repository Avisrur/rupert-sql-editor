class WhereParser {
  constructor() {}

  parse(operationValue) {
    let whereValues = operationValue.split(" ").join("");
    let whereNewValues = this.splitByOperator(whereValues);
    if (this.secondWhereArgumentIsColumn(whereNewValues[1])) {
      return [...whereNewValues];
    }
    return [whereNewValues[0]];
  }

  secondWhereArgumentIsColumn(secondWhereArgument) {
    return secondWhereArgument.includes(".");
  }

  splitByOperator(whereValues) {
    if (whereValues.includes(">=")) {
      return whereValues.split(">=");
    } else if (whereValues.includes("<=")) {
      return whereValues.split("<=");
    } else if (whereValues.includes("=")) {
      return whereValues.split("=");
    }
  }
}

module.exports = WhereParser;
