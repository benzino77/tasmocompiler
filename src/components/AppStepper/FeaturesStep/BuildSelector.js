import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

function BuildSelector(props) {
  const { name, classes, label, value, desc, onChange, items } = props;

  const inProps = {
    name,
    id: `${name}-id`,
  };

  return (
    <FormControl className={classes.versionContainer}>
      <InputLabel htmlFor={inProps.id}>{label}</InputLabel>
      <Select value={value} onChange={onChange} inputProps={inProps}>
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.value === 'custom' && <FormattedMessage id="stepFeaturesBuildCustomName" />}
            {item.value !== 'custom' && item.name}
          </MenuItem>
        ))}
      </Select>
      <Typography>
        <FormattedMessage id={desc} />
      </Typography>
    </FormControl>
  );
}

BuildSelector.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  desc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BuildSelector;
