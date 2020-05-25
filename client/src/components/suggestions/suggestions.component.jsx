import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  checkWhichSqlClauseHasChanged,
  sortByPriority,
} from "./suggestions.utils";
import axios from "axios";

import {
  selectQueryObject,
  selectQueryString,
} from "../../redux/query/query.selectors";
import { setQueryUsingSuggestion } from "../../redux/query/query.actions";
import { addUserInteraction } from "../../redux/user-interactions/user-interactions.actions";

import "./suggestions.styles.css";

const tableSuggestionsUrl =
  "http://localhost:5000/suggestion/tableNamesStartsWith";
const columnSuggestionUrl = "http://localhost:5000/suggestion/columnNames";

const Suggestions = ({
  queryObject,
  queryString,
  setQueryUsingSuggestion,
  addUserInteraction,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [lastQueryObject, setLastQueryObject] = useState(queryObject);
  const [lastSqlClause, setLastSqlClause] = useState("");
  let curSqlClause = "";

  useEffect(() => {
    curSqlClause = checkWhichSqlClauseHasChanged(lastQueryObject, queryObject);
    if (queryString === "Type Your Query Here...") {
      curSqlClause = "";
    }
    if (curSqlClause !== undefined && curSqlClause !== "") {
      let sortedSuggestions;
      if (
        queryObject[curSqlClause][queryObject[curSqlClause].length - 1] ===
          "." &&
        curSqlClause !== "join" &&
        curSqlClause !== "from"
      ) {
        axios
          .post(columnSuggestionUrl, {
            table_name: queryObject[curSqlClause].slice(0, -1),
          })
          .then((response) => {
            sortedSuggestions = sortByPriority(response.data, curSqlClause);
            setSuggestions(sortedSuggestions);
            setLastQueryObject(queryObject);
          });
      } else {
        axios
          .post(tableSuggestionsUrl, {
            startsWith: queryObject[curSqlClause],
          })
          .then((response) => {
            sortedSuggestions = sortByPriority(response.data, curSqlClause);
            setSuggestions(sortedSuggestions);
            setLastQueryObject(queryObject);
          });
      }
    }
    setLastSqlClause(curSqlClause);
    setSuggestions([]);
  }, [queryObject]);

  return (
    <div className="suggestion-container">
      <h2 className="suggestion-header">
        Suggestion List
        {lastSqlClause !== "" ? `For ${lastSqlClause.toUpperCase()}` : ""}
      </h2>
      <ul className="list-group">
        {suggestions === undefined || suggestions.length === 0 ? (
          <span className="no-suggestions">No suggestions yet...</span>
        ) : (
          suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="list-group-item list-group-item-info"
              onClick={() => {
                addUserInteraction({
                  curSqlClause: lastSqlClause,
                  curQueryString: queryString,
                  suggestion: suggestion.name,
                });
                setQueryUsingSuggestion(suggestion, queryObject, lastSqlClause);
              }}
            >
              {suggestion.name}
              <span className="used-span"> | used: {suggestion.used}</span>
              <span className="used-span">
                {suggestion.common_op !== null &&
                suggestion.common_op !== undefined
                  ? `common op: ${suggestion.common_op.toUpperCase()}`
                  : null}{" "}
                |
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  queryObject: selectQueryObject,
  queryString: selectQueryString,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryUsingSuggestion: (suggestion, queryObject, lastSqlClause) =>
    dispatch(setQueryUsingSuggestion(suggestion, queryObject, lastSqlClause)),
  addUserInteraction: (userInteraction) =>
    dispatch(addUserInteraction(userInteraction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
