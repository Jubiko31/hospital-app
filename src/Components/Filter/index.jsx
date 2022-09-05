import React from 'react';
import { DeleteDate } from '../../assets/svg/allSvgs';
import './index.css';

const Filter = ({
  filterValue, setFilterValue, handleDeleteFilter, filter,
}) => {
  const { isFilter } = filterValue;
  const setFilterValues = (input) => {
    setFilterValue({ ...filterValue, ...input });
  };

  return (
    <>
      {isFilter && (
      <div className="filter-container">
        <div className="start-date">
          <label id="start-input-l" htmlFor="start-input">From: </label>
          <input
            type="date"
            id="start-input"
            onInput={({ target }) => setFilterValues({ initialDate: target.value })}
          />
        </div>
        <div className="end-date">
          <label id="end-input-l">To: </label>
          <input
            type="date"
            id="end-input"
            onInput={({ target }) => setFilterValues({ toDate: target.value })}
          />
        </div>
        <div id="filter-bar">
          <button id="filter-btn" onClick={() => filter()} type="button">Filter</button>
        </div>
        <button id="btn" onClick={() => handleDeleteFilter()} type="button">
          <DeleteDate className="del-btn" />
        </button>
      </div>
      )}
    </>
  );
}

export default Filter;
