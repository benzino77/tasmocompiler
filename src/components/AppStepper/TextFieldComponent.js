import React from 'react';
import TextField from '@material-ui/core/TextField';

function TextFieldComponent(props) {
    return (
      <TextField
        id={`${props.name}-id`}
        name={props.name}
        label={props.label}
        className={props.classes.textField}
        value={props.value}
        onChange={props.onChange}
        margin='normal'
        type={props.type ? props.type : 'text'}
      />
    );
}

export default TextFieldComponent;
