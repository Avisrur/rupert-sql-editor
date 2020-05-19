import React, { useState } from "react";
import CodeMirror from "react-codemirror";
// import axios from "axios";
import "codemirror/mode/sql/sql";
import "codemirror/theme/dracula.css";

import "./code-mirror.styles.css";

const CodeMirrorComponent = () => {
  const [code, setCode] = useState("Type query here...");
  const handleTab = () => {
    console.log("WORKSSSS");
  };

  const onChange = (newValue) => {
    // if (newValue.toLowerCase().includes("from ") && !this.state.fromSelected) {
    //   this.setState({ ...this.state, fromSelected: true });
    //   axios
    //     .post(`http://localhost:5000/suggestion/tablesName`, { newValue })
    //     .then((res) => {
    //       console.log(res.data);
    //     });
    // }

    // if (!newValue.toLowerCase().includes("from ") && this.state.fromSelected) {
    //   this.setState({ ...this.state, fromSelected: false });
    // }
    console.log(newValue);
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
      value={code}
      onChange={onChange}
      options={options}
      autoFocus={true}
    />
  );
};

export default CodeMirrorComponent;
