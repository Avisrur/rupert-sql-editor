import React from "react";
import CodeMirror from "react-codemirror";
import "codemirror/mode/sql/sql";
import "codemirror/theme/dracula.css";

import "./editor.styles.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code...",
    };
  }
  onChange(newValue) {
    console.log("onChange", newValue);
  }

  submitQuery = () => {
    console.log(this.state.code);
  };

  render() {
    const code = this.state.code;
    const options = {
      lineNumbers: true,
      theme: "dracula",
    };
    return (
      <div>
        <button className="submit-button" onClick={this.submitQuery}>
          Run Query
        </button>
        <CodeMirror value={code} onChange={this.onChange} options={options} />
      </div>
    );
  }
}
export default Editor;
