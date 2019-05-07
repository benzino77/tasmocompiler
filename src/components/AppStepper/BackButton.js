import React from 'react';
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

export default BackButton;
