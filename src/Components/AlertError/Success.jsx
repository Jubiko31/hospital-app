import React from 'react';
import { Alert } from 'react-bootstrap';
import '../LoginPage/login.css';

const Success = ({ success, setSuccess }) => {
  return (
    <Alert
      variant="success"
      className="position-absolute alert-error p-4"
      onClose={() => setSuccess(false)}
      dismissible
    >
      <Alert.Heading>User was Successfully Created</Alert.Heading>
      {(success)
        ? (
          <ul className="p-3">
            <li>{success}</li>
          </ul>
        ) : (
          null
        )}

    </Alert>
  );
}

export default Success;
