class SelectParser {
  constructor() {}

  parse(operationValue) {
    let selectValues = operationValue.split(" ").join("").split(",");
    return selectValues.map((value) => {
      let newValue = value.replace("sum(", "").replace("avg(", "").replace(")", "");
      return newValue;
    });
  }

  trimSumAndAvgFromColumnNames(value) {
    //didnt work
    return value.replace("sum(", "").replace("avg(", "").replace(")", "");
  }
}

module.exports = SelectParser;
