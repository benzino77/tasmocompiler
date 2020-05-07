import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import LanguageIcon from '@material-ui/icons/Language';
import { Tooltip } from '@material-ui/core';

function TopAppBar(props) {
  const { classes, ...other } = props;

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default" {...other} className={classes.appbar}> */}
      <AppBar {...other} position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            TasmoCompiler
          </Typography>
          <Tooltip
            title={
              <FormattedMessage id="appBarLangTooltip" />
            }
          >
            <Typography
              variant="caption"
              color="inherit"
              className={classes.language}
            >
              <LanguageIcon className={classes.leftIcon} />
              <FormattedMessage id="appBarLangFlag" />
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopAppBar.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TopAppBar;
