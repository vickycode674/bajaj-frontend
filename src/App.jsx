import React, { useState, useEffect } from "react";
import axios from "axios";
import JsonInput from "./components/JsonInput";
import DropdownFilter from "./components/DropdownFilter";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "RA2111028020030"; // Set your roll number here
  }, []);

  const [jsonData, setJsonData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const handleJsonSubmit = (parsedJson) => {
    setJsonData(parsedJson);
    setDropdownVisible(true);
    setFilteredData([]); // Reset the filtered data on new JSON submission
  };

  const handleSubmit = async () => {
    if (!jsonData) return;

    // Make a POST request to your API
    try {
      const response = await axios.post("https://your-backend-url/bfhl", jsonData);
      setApiResponse(response.data); // Store the API response
      // Add your filtering logic here, if needed
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <div className="App">
      <h1>React JSON Processor</h1>
      {/* Table Structure */}
      <table className="input-table" border="1">
        <tbody>
          <tr>
            <td>
              <JsonInput onJsonSubmit={handleJsonSubmit} />
            </td>
          </tr>
          {dropdownVisible && (
            <tr>
              <td>
                <DropdownFilter
                  onSelectOptions={setSelectedOptions}
                  selectedOptions={selectedOptions}
                />
              </td>
            </tr>
          )}
          {dropdownVisible && (
            <tr>
              <td style={{ textAlign: "center" }}>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </td>
            </tr>
          )}
          {apiResponse && (
            <tr>
              <td>
                <div className="response">
                  <strong>API Response: </strong>
                  {JSON.stringify(apiResponse)}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
