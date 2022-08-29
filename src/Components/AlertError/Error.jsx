import React from 'react';
import { Toast } from 'react-bootstrap';

function Error({ error, setError }) {
  return (
    <Toast
      className="position-absolute alert-error"
      onClose={() => setError(null)}
    >
      <Toast.Header>
        <strong className="me-auto">Oh, Something&lsquo;s wrong I can feel it</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>
        {Array.isArray(error)
          ? (
            <ul className="p-3">
              {error.map((err) => (
                <li>{err}</li>
              ))}
            </ul>
          ) : (
            <p>{error}</p>
          )}
      </Toast.Body>
    </Toast>
  );
}

export default Error;
