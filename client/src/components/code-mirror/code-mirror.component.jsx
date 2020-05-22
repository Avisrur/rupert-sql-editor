import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQueryString } from "../../redux/query/query.selectors";
import { setQuery } from "../../redux/query/query.actions";
import "codemirror/mode/sql/sql";
import "codemirror/theme/dracula.css";

import "./code-mirror.styles.css";

const CodeMirrorComponent = ({ queryString, setQuery }) => {
  const handleTab = () => {
    console.log("WORKSSSS");
  };

  const onChange = (e, a, newValue) => {
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
      autoCursor={false}
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
