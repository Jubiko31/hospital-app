import React, { useState, useEffect } from 'react';
import { DoctorContext } from '../../contexts/DoctorContext';
import { getAll, getDoctors } from '../../services/api';
import Error from '../AlertError/Error';
import HeaderComponent from '../Header/Header';
import List from '../List';
import AddField from '../AddField';
import './index.css';

const Receptions = () => {
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [receptions, setReceptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const allReceptions = getAll();
    allReceptions
      .then((data) => {
        setReceptions(data);
      })
      .catch((err) => {
        console.log(err);
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

  const confirmEdit = (data) => {
    setReceptions(data);
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
            />
          ))}
        </tbody>
      </table>
    </DoctorContext.Provider>
  );
}

export default Receptions;
