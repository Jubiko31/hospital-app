import React, { useState } from 'react';
import './index.css';

function SortInput({ sortByValue, sortValue, setSortValue }) {
  const [isSelected, setIsSelected] = useState(null);

  const setSortValues = (inputData) => {
    setSortValue({ ...sortValue, ...inputData });
  };

  const showDirection = () => {
    setIsSelected(true);
    document.getElementById('sort-label').classList.add('toggle-label');
    document.getElementById('sort-select').classList.add('toggle-select');
  };
  return (
    <div className="sort-container">
      <label id="sort-label">Sort By:</label>
      <select
        id="sort-select"
        onClick={({ target }) => {
          setSortValues({ value: target.value });
          showDirection();
        }}
      >
        <option value="choose column">Choose column</option>
        <option value="patientName">Patient Name</option>
        <option value="date">Date</option>
        <option value="doctor">Doctor Name</option>
      </select>

      {isSelected && (
        <div>
          <label id="sort-label">Direction:</label>
          <select
            id="sort-select"
            onChange={({ target }) => {
              setSortValues({ direction: target.value });
            }}
            onClick={() => sortByValue()}
          >
            <option value="">Choose Direction</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
    </div>

  );
}

export default SortInput;
