import React, { useState } from "react";
import "../../styles/index.css";

const JsonInput = ({ onJsonSubmit }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      onJsonSubmit(parsedJson);  // Pass valid JSON to parent component
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Invalid JSON format");
    }
  };

  return (
    <div className="json-input-container">
      <h1>Enter JSON Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="json-textarea"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A", "B", "C"]}'
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default JsonInput;
