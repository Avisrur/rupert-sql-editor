import React from "react";
import "./App.css";

import CodeMirrorComponent from "./components/code-mirror/code-mirror.component";
import SubmitButton from "./components/submit-button/submit-button.component";

function App() {
  return (
    <div>
      <div className="app-header">Welcome To SQL Predictor Editor</div>
      <SubmitButton />
      <CodeMirrorComponent />
    </div>
  );
}

export default App;
