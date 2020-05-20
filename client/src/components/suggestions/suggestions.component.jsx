import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  checkWhichSqlClauseHasChanged,
  getSuggestionsAccordingToCurrentClause,
} from "./suggestions.utils";

import { selectQueryObject } from "../../redux/query/query.selectors";
import { setQuery } from "../../redux/query/query.actions";

import "./suggestions.styles.css";

const Suggestions = ({ queryObject }) => {
  let suggestions;
  const [lastQueryObject, setLastQueryObject] = useState({});
  let lastSqlClause;

  useEffect(() => {
    console.log(lastQueryObject);
    lastSqlClause = checkWhichSqlClauseHasChanged(lastQueryObject, queryObject);
    suggestions = getSuggestionsAccordingToCurrentClause(
      lastSqlClause,
      queryObject
    );
    console.log(suggestions);
    console.log(lastSqlClause);

    setLastQueryObject(queryObject);
  }, [queryObject]);

  return (
    <div className="suggestion-container">
      <h2 className="suggestion-header">Suggestion List</h2>
      <ul className="list-group">
        {suggestions === undefined || suggestions.length === 0 ? (
          <span className="no-suggestions">No suggestions yet...</span>
        ) : (
          suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="list-group-item list-group-item-info"
            >
              suggestion.name
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
