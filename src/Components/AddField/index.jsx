import React, { useState, useContext } from 'react';
import { addNewReception } from '../../services/api';
import { DoctorContext } from '../../contexts/DoctorContext';
import { validName, valiDate } from '../../validators';
import './index.css';

const AddField = ({ setAddedData, setError }) => {
  const [newReception, setNewReception] = useState([{
    patientName: '', doctorId: '', date: '', complaint: '',
  }]);
  const setInputedData = (inputData) => {
    setNewReception({ ...newReception, ...inputData });
  };

  const setNewValues = async () => {
    try {
      const errors = [];
      const {
        patientName, date, complaint, doctorId,
      } = newReception;
      if (!patientName.trim() || !date || !complaint.trim() || !doctorId) {
        setError('All fields are required');
      }
      if (!validName(patientName)) errors.push('Enter valid patient name.');
      if (!valiDate(date)) errors.push('Invalid date');
      if (!complaint.trim()) errors.push('Enter valid text format');
      if (errors.length) {
        setError(errors);
      } 
      else {
        const data = await addNewReception(newReception);
        setAddedData(data);
      }
    } catch (error) {
      setError('Oops something went wrong! Please try again.')
    }
  };

  const doctors = useContext(DoctorContext);
  const { id: doctorId } = doctors;

  return (
    <div className="container">
      <div>
        <label id="name-label" htmlFor="name-input">Name</label>
        <input
          type="text"
          id="name-input"
          className="add-reception"
          placeholder="Patient Name"
          onInput={({ target }) => setInputedData({ patientName: target.value })}
        />
      </div>

      <div>
        <label id="doctor-label" htmlFor="select-doctors">Doctor</label>
        <select
          id="select-doctors"
          name="doctor"
          type="select"
          onChange={({ target }) => setInputedData({ doctorId: parseInt(target.value, 10) })}
        >
          <option value={doctorId}>Select Doctor</option>
          {doctors.length
                && doctors.map((doctor) => {
                 const { doctorName, id, studyBranch } = doctor;
                 return (
                  <option value={id}>
                    {doctorName}
                    {' '}
                    (
                    {studyBranch}
                    )
                  </option>
                 );
          })}
        </select>
      </div>

      <div>
        <label id="date-label" htmlFor="date-input">Date</label>
        <input
          type="date"
          id="date-input"
          className="add-reception"
          onChange={({ target }) => setInputedData({ date: target.value })}
        />
      </div>
      <div>
        <label id="complaint" htmlFor="complaint-input">Complaint</label>
        <input
          type="text"
          id="complaint-input"
          className="add-reception"
          placeholder="Patient&lsquo;s complaint"
          onInput={({ target }) => setInputedData({ complaint: target.value })}
        />
      </div>
      <button
        type="button"
        id="add"
        onClick={setNewValues}
      >
        Add
      </button>
    </div>
  );
}

export default AddField;
