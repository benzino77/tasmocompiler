import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';

function BoardsSelector(props) {
  const {
    onChange,
    classes,
    item: { name, description, tooltip },
    index,
  } = props;
  const Wire = ({ children, ...props }) => children(props);

  return (
    // tooltips workaround
    <Wire
      value={name}
      key={index}
      className={classes.radioContainer}
    >
      {(props) => (
        <Tooltip
          title={
            tooltip ? <FormattedMessage id={tooltip} /> : ''
          }
        >
          <FormControlLabel
            control={<Radio />}
            label={description}
            labelPlacement="end"
            onChange={onChange}
            {...props}
          />
        </Tooltip>
      )}
    </Wire>
  );
}

BoardsSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    tooltip: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default BoardsSelector;
