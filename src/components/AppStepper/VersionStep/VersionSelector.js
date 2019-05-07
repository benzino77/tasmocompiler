import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function VersionSelector(props) {
  const inProps = {
    name: props.name,
    id: `${props.name}-id`,
  }

  return (
    <FormControl className={props.classes.actionsContainer}>
      <InputLabel htmlFor={inProps.id}>{props.label}</InputLabel>
      <Select value={props.value} onChange={props.onChange} inputProps={inProps}>
        {props.items.map((item, index) => <MenuItem key={index} value={item.value ? item.value : item}>{item.name ? item.name : item}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default VersionSelector;
