const SelectParser = require("./types/select-parser");
const FromParser = require("./types/from-parser");
const WhereParser = require("./types/where-parser");
const JoinParser = require("./types/join-parser");
const OnParser = require("./types/on-parser");
const GroupByParser = require("./types/group-by-parser");

class ParserFactory {
  constructor() {
    this.parserTypes = {
      select: new SelectParser(),
      from: new FromParser(),
      where: new WhereParser(),
      join: new JoinParser(),
      on: new OnParser(),
      by: new GroupByParser(),
    };
  }

  getParserByType(type) {
    return this.parserTypes[type];
  }
}

module.exports = ParserFactory;
