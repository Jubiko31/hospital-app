import React, { useContext } from 'react';
import { DoctorContext } from '../../contexts/DoctorContext';

const List = ({
  listData,
  setAfterDelete,
  setAfterEdit,
}) => {
  const {
    id, patientName, date, doctor, complaint,
  } = listData;
  const { id: docId } = doctor;
  const doctors = useContext(DoctorContext);
  const handleClick = (id) => {
    setAfterDelete(id);
  };
  const handleClickEdit = (id) => {
    setAfterEdit(id);
  };

  return (
    <tr key={id}>
      <td>{patientName}</td>
      {doctors.length
            && doctors.map((doc) => {
              const { doctorName, id, studyBranch } = doc;
              if (docId === id) {
                return (
                  <td value={id}>
                    {doctorName}
                    {' '}
                    (
                    {studyBranch}
                    )
                  </td>
                );
              }
            })}
      <td>{date}</td>
      <td>{complaint}</td>
      <td>
        <img
          className="icons"
          src="https://img.icons8.com/external-colours-bomsymbols-/91/000000/external-bin-business-marketing-colors-set-2-colours-bomsymbols--2.png"
          alt="del"
          onClick={() => handleClick(id)}
        />
        <img
          className="icons"
          src="https://img.icons8.com/color/48/000000/pen.png"
          alt="edit"
          onClick={() => handleClickEdit(id)}
        />
      </td>
    </tr>
  );
}

export default List;
