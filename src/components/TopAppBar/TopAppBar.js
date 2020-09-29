import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import LanguageIcon from '@material-ui/icons/Language';
import { Tooltip } from '@material-ui/core';

class TopAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { version: '' };
  }

  componentDidMount() {
    fetch('/api/v1/tcversion')
      .then((res) => res.json())
      .then((ret) => {
        this.setState({ version: `v${ret.version}` });
      })
      .catch((error) => {
        this.setState({ version: '' });
      });
  }

  render() {
    const { classes, ...other } = this.props;
    const { version } = this.state;
    return (
      <div className={classes.root}>
        {/* <AppBar position="static" color="default" {...other} className={classes.appbar}> */}
        <AppBar {...other} position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit">
              TasmoCompiler {version}
            </Typography>
            <Tooltip title={<FormattedMessage id="appBarLangTooltip" />}>
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
}

TopAppBar.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TopAppBar;
