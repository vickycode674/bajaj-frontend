import React, { useState,useEffect } from "react";
import JsonInput from "./components/JsonInput";
import DropdownFilter from "./components/DropdownFilter";
import "./App.css";

function App() {

  useEffect(() => {
    document.title = "RA2111028020029"; // Set your roll number here
  }, []);
  const [jsonData, setJsonData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleJsonSubmit = (parsedJson) => {
    setJsonData(parsedJson);
    setDropdownVisible(true);
    setFilteredData([]); // Reset the filtered data on new JSON submission
  };

  const handleSubmit = () => {
    if (!jsonData) return;
    const data = jsonData.data || [];
    let filtered = [];

    if (selectedOptions.includes("alphabets")) {
      filtered.push(...data.filter((item) => /^[A-Za-z]+$/.test(item)));
    }

    if (selectedOptions.includes("numbers")) {
      filtered.push(...data.filter((item) => /^[0-9]+$/.test(item)));
    }

    if (selectedOptions.includes("lowercase")) {
      const lowercase = data.filter((item) => /^[a-z]+$/.test(item));
      if (lowercase.length > 0) {
        filtered.push(Math.max(...lowercase));
      }
    }

    setFilteredData(filtered);
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
          {filteredData.length > 0 && (
            <tr>
              <td>
                <div className="response">
                  <strong>Filtered Response: </strong>
                  {filteredData.join(", ")}
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
