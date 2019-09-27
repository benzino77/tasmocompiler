import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function BackButton(props) {
  const { disabled, onClick } = props;
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
    Back
    </Button>
  );
}

BackButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
