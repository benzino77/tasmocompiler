import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';

function ClearButton(props) {
  const { disabled, onClick } = props;
  return (
    <Button disabled={disabled} variant='contained' color='primary' onClick={onClick}>
      <FormattedMessage id='btnClear' />
    </Button>
  );
}

ClearButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClearButton;
