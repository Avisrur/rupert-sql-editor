import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setQuery } from "../../redux/query/query.actions";

import "./submit-button.styles.css";
import { selectInteractions } from "../../redux/user-interactions/user-interactions.selectors";
import { selectQueryString } from "../../redux/query/query.selectors";
import { clearUserInteractions } from "../../redux/user-interactions/user-interactions.actions";

const SubmitButton = ({
  queryString,
  setQuery,
  interactions,
  clearUserInteractions,
}) => {
  const submitQuery = () => {
    const data = {
      interactions,
      query: queryString,
    };

    axios
      .post(`http://localhost:5000/query/submitQuery`, { data })
      .then((res) => {
        console.log(res);
        alert("Query Has Been Successfully Submited");
        setQuery("Type Your Query Here...");
        clearUserInteractions();
      });
  };

  return (
    <button className="submit-button" onClick={submitQuery}>
      Run Query
    </button>
  );
};

const mapStateToProps = createStructuredSelector({
  queryString: selectQueryString,
  interactions: selectInteractions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuery: (queryString) => dispatch(setQuery(queryString)),
  clearUserInteractions: () => dispatch(clearUserInteractions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
