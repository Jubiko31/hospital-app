import React from 'react';
import { Modal, Button, ModalTitle } from 'react-bootstrap';
import { deleteReception } from '../../services/api';

const Delete = ({ setIdToDelete, idToDelete, confirmDelete, setReceptions, setError }) => {
  const confirm = async (id) => {
    try {
      const removed = await deleteReception(id);
      if (removed) {
        setIdToDelete(null);
        setReceptions(removed);
      }
      
    } catch (err) {
      setError('Oops! Something did not really went well. Please try again')
    }
  };

  return (
    <Modal show backdrop="static" keyboard={false}>
      <Modal.Header><ModalTitle>Are you sure?</ModalTitle></Modal.Header>
      <Modal.Body>Do you really want to delete this patient?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIdToDelete(null)}
        >
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => confirm(idToDelete)}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Delete;
