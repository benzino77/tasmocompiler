import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function FeaturesSelector(props) {

  return (
    <div className={props.classes.checkboxContainer}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value}
            name={props.item.name}
            onChange={props.onChange}
            value={props.item.name}
          />
        }
        label={props.item.description}
      />
    </div>
  );
}

export default FeaturesSelector;
