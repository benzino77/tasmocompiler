import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import LanguageIcon from '@material-ui/icons/Language';
import { Menu, MenuItem } from '@material-ui/core';
import { allMessages } from '../../locales/languages';

class TopAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { version: '', anchorEl: null };
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

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (lang, locale) => {
    if (lang && lang !== locale) {
      const { changeLanguage } = this.props;
      changeLanguage(lang);
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, locale, changeLanguage, ...other } = this.props;
    const { version, anchorEl } = this.state;

    return (
      <div className={classes.root}>
        {/* <AppBar position="static" color="default" {...other} className={classes.appbar}> */}
        <AppBar {...other} position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit">
              TasmoCompiler {version}
            </Typography>
            <div className={classes.language} role="button" tabIndex={0} aria-controls="langs-menu" aria-haspopup="true" onClick={this.handleOpen} onKeyPress={this.handleOpen}>
              <Typography
                variant="caption"
                color="inherit"
                className={classes.language}
              >
                <FormattedMessage id="appBarLang" />
                <LanguageIcon className={classes.rightIcon} />
              </Typography>
            </div>
            <Menu
              className={classes.languageList}
              id="langs-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => this.handleClose()}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {Object.keys(allMessages)
                .sort()
                .map((lang) => {
                  return (
                    <MenuItem
                      onClick={() => this.handleClose(lang, locale)}
                      key={lang}
                      selected={locale === lang}
                    >
                      <img src={`flags/${allMessages[lang].appBarLangFlag}.png`} alt="" className={classes.flagIcon} />
                      <div className={classes.languageName}>
                        {allMessages[lang].appBarLang}
                      </div>
                    </MenuItem>
                  );
                })
              }
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopAppBar.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  locale: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

export default TopAppBar;
