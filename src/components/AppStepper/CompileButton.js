import React from 'react';
import Button from '@material-ui/core/Button';

function CompileButton(props) {
  const { disabled, onClick } = props;
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
    Compile
    </Button>
  );
}

export default CompileButton;
