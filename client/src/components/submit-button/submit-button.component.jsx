import React from "react";
import axios from "axios";

import "./submit-button.styles.css";

const SubmitButton = () => {
  const submitQuery = () => {
    console.log("bla");
    const data = {
      data: "bla",
    };
    axios
      .post(`http://localhost:5000/query/submitQuery`, { data })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <button className="submit-button" onClick={submitQuery}>
      Run Query
    </button>
  );
};

export default SubmitButton;
