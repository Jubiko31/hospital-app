import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../../contexts/DoctorContext';
import { getAll, getDoctors } from '../../services/api';
import Error from '../AlertError/Error';
import HeaderComponent from '../Header/Header';
import List from '../List';
import AddField from '../AddField';
import Delete from '../Modals/Delete';
import Edit from '../Modals/Edit';
import SortInput from '../Sort';
import './index.css';

const Receptions = () => {
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [receptions, setReceptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [sortValue, setSortValue] = useState({ value: '', direction: '' });
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allReceptions = getAll();
    allReceptions
      .then((data) => {
        setReceptions(data);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          navigate('/login');
          localStorage.removeItem('token');
        }
      });

    const doctors = getDoctors();
    doctors
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  const setAddedData = (data) => {
    setReceptions(data);
  };

  const setAfterDelete = (id) => {
    setIdToDelete(id);
  };
  const setAfterEdit = (id) => {
    setIdToEdit(id);
  };

  const sortByValue = () => {
    const { value, direction } = sortValue;
    let firstValue = '';
    let secondValue = '';
    if (value && direction) {
      const sortedValues = [...receptions].sort((a, b) => {
        {value === 'doctor' ? firstValue = a.doctor.doctorName.toLowerCase() : firstValue = a[value].toLowerCase()}
        {value === 'doctor' ? secondValue = b.doctor.doctorName.toLowerCase() : secondValue = b[value].toLowerCase()}
        
        if (firstValue < secondValue) return -1;
        if (firstValue > secondValue) return 1;
        return 0;
      });

      if (direction === 'desc') sortedValues.reverse();
      setReceptions(sortedValues);
    }
  };

  const dataToShow = filtered.length ? filtered : receptions;

  return (
    <DoctorContext.Provider value={doctors}>
      {error && <Error error={error} setError={setError} />}
      <HeaderComponent page="Medical Receptions" />
      <AddField
        receptions={receptions}
        setReceptions={setReceptions}
        setAddedData={setAddedData}
        setError={setError}
      />
      {idToDelete && (
      <Delete
        idToDelete={idToDelete}
        setIdToDelete={setIdToDelete}
        setReceptions={setReceptions}
        setError={setError}
      />
      )}
      {idToEdit && (
      <Edit
        idToEdit={idToEdit}
        setIdToEdit={setIdToEdit}
        receptions={receptions}
        setReceptions={setReceptions}
        setError={setError}
      />
      )}
      <SortInput
        sortByValue={sortByValue}
        setSortValue={setSortValue}
        sortValue={sortValue}
      />
      <table className="table table-bordered table-hover" id="reception-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Complaint</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((item) => (
            <List
              listData={{ ...item }}
              key={item.id}
              setAfterDelete={setAfterDelete}
              setAfterEdit={setAfterEdit}
              setIdToDelete={setIdToDelete}
            />
          ))}
        </tbody>
      </table>
    </DoctorContext.Provider>
  );
}

export default Receptions;
