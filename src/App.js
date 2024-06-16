// src/App.js
import React from "react";
import CodeEditor from "./component/CodeEditor";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Simple Code Editor</h1>
      <CodeEditor />
    </div>
  );
};

export default App;
