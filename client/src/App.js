import React from "react";
import "./App.css";

import CodeMirrorComponent from "./components/code-mirror/code-mirror.component";
import SubmitButton from "./components/submit-button/submit-button.component";
import Suggestions from "./components/suggestions/suggestions.component";

function App() {
  return (
    <div>
      <div className="app-header">Welcome To SQL Predictor Editor</div>
      <SubmitButton />
      <div className="editor-container">
        <CodeMirrorComponent />
        <Suggestions />
      </div>
    </div>
  );
}

export default App;
