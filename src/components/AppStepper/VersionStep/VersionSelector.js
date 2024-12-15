import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormattedMessage } from 'react-intl';

function VersionSelector(props) {
  const { name, classes, label, value, onChange, items, preselectedTasmotaGUILanguage } = props;

  const inProps = {
    name,
    id: `${name}-id`,
  };

  return (
    // <FormControl className={name === 'MY_LANGUAGE' ? classes.languageContainer : classes.versionContainer}>
    // <InputLabel htmlFor={inProps.id}>{label}</InputLabel>
    //<Select value={value} onChange={onChange} inputProps={inProps}>
    <TextField
      value={value}
      onChange={onChange}
      inputProps={inProps}
      label={label}
      className={name === 'MY_LANGUAGE' ? classes.languageContainer : classes.versionContainer}
      select
    >
      {items.map((item) => (
        <MenuItem key={item.name || item} value={item.value || item}>
          {name !== 'MY_LANGUAGE' && (item === 'development' ? <FormattedMessage id='stepVersionDevelopment' /> : item)}
          {name === 'MY_LANGUAGE' && (
            <div className={classes.tasmotaLangSelector}>
              <img className={classes.flagIcon} src={item.flag} alt='' />
              <div className={classes.languageName}>
                <FormattedMessage id={item.name}>
                  {(text) => {
                    const suffix = preselectedTasmotaGUILanguage !== item.value ? ` / ${item.nativeName}` : '';
                    return `${text}${suffix}`;
                  }}
                </FormattedMessage>
              </div>
            </div>
          )}
        </MenuItem>
      ))}
    </TextField>
    // </Select>
    //  </FormControl>
  );
}

VersionSelector.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  preselectedTasmotaGUILanguage: PropTypes.string,
};

export default VersionSelector;
