import React from 'react';
import { Modal, Button, ModalTitle } from 'react-bootstrap';
import { deleteReception } from '../../services/api';

function Delete({ setIdToDelete, idToDelete, confirmDelete, setError }) {
  const confirm = async (id) => {
    try {
      setIdToDelete(null)
      const removed = await deleteReception(id);
      confirmDelete(removed);
    } catch (err) {
      setError('Oops! Something did not really went well. Please try again')
    }
  };

  const close = () => {
    setIdToDelete(null)
  }
  return (
    <Modal show backdrop="static" keyboard={false}>
      <Modal.Header><ModalTitle>Are you sure?</ModalTitle></Modal.Header>
      <Modal.Body>Do you really want to delete this patient?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => close()}
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
