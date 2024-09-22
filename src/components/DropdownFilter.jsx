import React from "react";
import "../../styles/index.css";

const DropdownFilter = ({ onSelectOptions, selectedOptions }) => {
  return (
    <div className="dropdown-container">
      <h3>Select Options</h3>
      <select
        className="dropdown-select"
        multiple
        value={selectedOptions}
        onChange={(e) =>
          onSelectOptions(Array.from(e.target.selectedOptions, (option) => option.value))
        }
      >
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="lowercase">Highest Lowercase Alphabet</option>
      </select>
    </div>
  );
};

export default DropdownFilter;
