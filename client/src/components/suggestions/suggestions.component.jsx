import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  checkWhichSqlClauseHasChanged,
  sortByPriority,
} from "./suggestions.utils";
import axios from "axios";

import { selectQueryObject } from "../../redux/query/query.selectors";
import { setQuery } from "../../redux/query/query.actions";

import "./suggestions.styles.css";

const Suggestions = ({ queryObject }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [lastQueryObject, setLastQueryObject] = useState(queryObject);
  const [lastSqlClause, setLastSqlClause] = useState("");
  let curSqlClause = "";

  useEffect(() => {
    curSqlClause = checkWhichSqlClauseHasChanged(lastQueryObject, queryObject);
    console.log(curSqlClause);
    if (curSqlClause !== undefined && curSqlClause !== "") {
      if (
        queryObject[curSqlClause][queryObject[curSqlClause].length - 1] === "."
      ) {
        axios
          .post("http://localhost:5000/suggestion/columnNames", {
            table_name: queryObject[curSqlClause].slice(0, -1),
          })
          .then((response) => {
            console.log("RESPONSE", response.data);
            const sortedSuggestions = sortByPriority(
              response.data,
              curSqlClause
            );
            setSuggestions(sortedSuggestions);
            setLastQueryObject(queryObject);
          });
      } else {
        axios
          .post("http://localhost:5000/suggestion/tableNamesStartsWith", {
            startsWith: queryObject[curSqlClause],
          })
          .then((response) => {
            console.log("RESPONSE", response.data);
            const sortedSuggestions = sortByPriority(
              response.data,
              curSqlClause
            );
            setSuggestions(sortedSuggestions);
            setLastQueryObject(queryObject);
          });
      }
    }
    setLastSqlClause(curSqlClause);
    setSuggestions([]);
  }, [queryObject]);

  const handleSuggestionSelection = (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
  };

  return (
    <div className="suggestion-container">
      <h2 className="suggestion-header">
        Suggestion List{" "}
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
                console.log(suggestion);
              }}
            >
              {suggestion.name}
              <span className="used-span"> | used: {suggestion.used}</span>
              <span className="used-span">
                common op: {suggestion.common_op.toUpperCase()} |
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
});

const mapDispatchToProps = (dispatch) => ({
  setQuery: (queryString) => dispatch(setQuery(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
