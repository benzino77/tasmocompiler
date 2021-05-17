import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';

function VersionSelector(props) {
  const { name, classes, label, value, onChange, items, locale } = props;

  const inProps = {
    name,
    id: `${name}-id`,
  };

  return (
    <FormControl className={classes.versionContainer}>
      <InputLabel htmlFor={inProps.id}>{label}</InputLabel>
      <Select value={value} onChange={onChange} inputProps={inProps}>
        {items.map((item) => (
          <MenuItem key={item.name || item} value={item.value || item}>
            {name !== 'MY_LANGUAGE' && (item.name || item)}
            {name === 'MY_LANGUAGE' && (
              <FormattedMessage
                id={item.name}
                values={{
                  flag: item.flag,
                  nativeName: (
                    locale !== item.value.split(/[-_]/)[0] ? ` / ${item.nativeName}` : ''
                  ),
                }}
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

VersionSelector.defaultProps = {
  locale: '',
};

VersionSelector.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

export default VersionSelector;
