import React, { useState } from 'react';
import './index.css';

const SortInput = ({ sortByValue, sortValue, setSortValue }) => {
  const setSortValues = (inputData) => {
    setSortValue({ ...sortValue, ...inputData });
  };

  return (
    <div className="sort-container">
      <div>
      <label for="sort-select" id="sort-label">Sort By:</label>
      <select
        id="sort-select"
        onClick={({ target }) => {
          setSortValues({ value: target.value });
        }}
      >
        <option value="">Choose column</option>
        <option value="patientName">Patient Name</option>
        <option value="date">Date</option>
        <option value="doctor">Doctor Name</option>
      </select>
      </div>
      {sortValue.value && (
        <div>
          <label id="direction-label">Direction:</label>
          <select
            id="direction-select"
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
