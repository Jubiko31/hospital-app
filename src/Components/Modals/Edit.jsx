import React, { useContext, useState } from 'react';
import { Modal, Button, ModalTitle } from 'react-bootstrap';
import { DoctorContext } from '../../contexts/DoctorContext';
import { editReception } from '../../services/api';
import { validName, valiDate } from '../../validators';

const Edit = ({
  setIdToEdit, idToEdit, receptions, afterEdit
}) => {
  const [editedReception, setEditedReception] = useState([{
    patientName: '', doctorId: '', date: '', complaint: '',
  }]);
  const [error, setError] = useState(null);
  const valuesToEdit = (inputData) => {
    setEditedReception({ ...editedReception, ...inputData });
  };

  const itemToEdit = receptions.find((element) => element.id === idToEdit);

  const { patientName, date, complaint } = itemToEdit;

  const confirm = async (id) => {
    try {
    const errors = [];
    const { patientName, date, complaint } = editedReception;
    if (!patientName && !date && !doctorId && !complaint) {
      setError('At least one input should be defined.');
    } else {
      if (patientName) {
        if (!patientName.trim() || !validName(patientName)) errors.push('Invalid name format.');
      }
      if (complaint) {
        if (!complaint.trim()) errors.push('Invalid text input.');
      }
      if (date) {
        if (!valiDate(date)) errors.push('Invalid date format');
      }
      if (errors.length) {
        setError(errors);
      }
      else {
        const edited = await editReception(id, editedReception);
        if (edited) {
          setIdToEdit(null);
          afterEdit(edited);
        }
      }
    }
    } catch (error) {
      setError('Oops! Something&lsquo;s wrong I can feel it. Please try again later');
    }
  };

  const doctors = useContext(DoctorContext);
  const { id: doctorId } = doctors;
  return (
    <Modal show backdrop="static" keyboard={false}>

      <Modal.Header>
        <ModalTitle>Edit Reception</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        {error && (
        <div className="errors">
          {Array.isArray(error)
            ? (
              <ul className="p-3 text-danger">
                {error.map((err) => (
                  <li>{err}</li>
                ))}
              </ul>
            ) : (
              <p className="text-danger">{error}</p>
            )}
        </div>
        )}
        <div>
          <label className="mt-2">Patient Name</label>
          <input
            key={idToEdit}
            className="p-2 mb-3 mt-1 w-100"
            id="patient-name"
            type="text"
            defaultValue={patientName}
            placeholder="Enter patient name"
            onInput={({ target }) => valuesToEdit({ patientName: target.value })}
          />
        </div>
        <div>
          <label className="mt-2">Doctor Name</label>
          <select
            className="p-2 mb-3 mt-1 w-100"
            id="doc-name"
            onChange={({ target }) => valuesToEdit({ doctorId: parseInt(target.value, 10) })}
          >
            <option value={doctorId}>Choose Doctor</option>
            {doctors.length
                        && doctors.map((doctor) => {
                          const { doctorName, id, branch } = doctor;
                          return (
                            <option defaultValue={id}>
                              {doctorName}
                              {' '}
                              {branch}
                            </option>
                          );
                        })}
          </select>
        </div>
        <div>
          <label className="mt-2">Date</label>
          <input
            className="p-2 mb-3 mt-1 w-100"
            type="date"
            id="date"
            defaultValue={date}
            onInput={({ target }) => valuesToEdit({ date: target.value })}
          />
        </div>
        <div>
          <label className="mt-2">Complaint</label>
          <textarea
            className="form-control mb-5"
            placeholder="What is your problem?"
            defaultValue={complaint}
            onInput={({ target }) => valuesToEdit({ complaint: target.value })}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIdToEdit(null)}>Close</Button>
        <Button variant="warning" onClick={() => confirm(idToEdit)}>Edit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Edit;
