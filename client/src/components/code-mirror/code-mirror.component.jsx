import React from "react";
import CodeMirror from "react-codemirror";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import axios from "axios";

import { selectQueryString } from "../../redux/query/query.selectors";
import { setQuery } from "../../redux/query/query.actions";
import "codemirror/mode/sql/sql";
import "codemirror/theme/dracula.css";

import "./code-mirror.styles.css";

const CodeMirrorComponent = ({ queryString, setQuery }) => {
  const handleTab = (e, a, d) => {
    console.log("WORKSSSS");
  };

  const onChange = (newValue) => {
    setQuery(newValue);
  };

  const options = {
    lineNumbers: true,
    theme: "dracula",
    extraKeys: {
      Tab: handleTab,
    },
  };

  return (
    <CodeMirror
      className="editor"
      value={queryString}
      onChange={onChange}
      options={options}
      autoFocus={true}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  queryString: selectQueryString,
});

const mapDispatchToProps = (dispatch) => ({
  setQuery: (queryString) => dispatch(setQuery(queryString)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeMirrorComponent);
