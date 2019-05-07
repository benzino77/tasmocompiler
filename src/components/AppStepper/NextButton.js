import React from 'react';
import Button from '@material-ui/core/Button';

function NextButton(props) {
  const { disabled, onClick } = props;
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
    Next
    </Button>
  );
}

export default NextButton;
