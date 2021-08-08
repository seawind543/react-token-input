/* eslint react/prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} style={{ marginRight: '4px' }}>
      Delete
    </button>
  );
};

DeleteButton.protoTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
