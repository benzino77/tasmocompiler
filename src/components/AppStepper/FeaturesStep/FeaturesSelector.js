import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';

function FeaturesSelector(props) {
  const { description, tooltip, name } = props.item;
  return (
    <div className={props.classes.checkboxContainer}>
      <Tooltip title={tooltip ? tooltip : ''}>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.value}
              name={name}
              onChange={props.onChange}
              value={name}
            />
          }
          label={description}
        />
      </Tooltip>
    </div>
  );
}

export default FeaturesSelector;
