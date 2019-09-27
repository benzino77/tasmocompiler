import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextFieldComponent(props) {
  const {
    name,
    label,
    classes,
    value,
    type,
    onChange,
  } = props;

  return (
    <TextField
      id={`${name}-id`}
      name={name}
      label={label}
      className={classes.textField}
      value={value}
      onChange={onChange}
      margin="normal"
      type={type}
    />
  );
}

TextFieldComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldComponent.defaultProps = {
  type: 'text',
};

export default TextFieldComponent;
