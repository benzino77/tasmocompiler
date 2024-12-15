import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import GitHub from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import { FormattedMessage } from 'react-intl';
import { Menu, MenuItem } from '@mui/material';
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
        <AppBar {...other} position='static' color='primary'>
          <Toolbar className={classes.toolbar}>
            <Typography variant='h6' color='inherit'>
              TasmoCompiler {version}
            </Typography>

            <div className={classes.toolbarRight}>
              <Tooltip title={<FormattedMessage id='headerProjectGithubPageTooltip' />}>
                <div className={classes.projectPageContainer}>
                  <a href='https://github.com/benzino77/tasmocompiler' target='_blank' rel='noopener noreferrer'>
                    <GitHub className={classes.projectPageImg} />
                  </a>
                </div>
              </Tooltip>
              <div
                className={classes.language}
                role='button'
                tabIndex={0}
                aria-controls='langs-menu'
                aria-haspopup='true'
                onClick={this.handleOpen}
                onKeyPress={this.handleOpen}
              >
                <Typography color='inherit' className={classes.language}>
                  {allMessages[locale].nativeName}
                  <LanguageIcon className={classes.rightIcon} />
                </Typography>
              </div>
            </div>
            <Menu
              className={classes.languageList}
              id='langs-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => this.handleClose()}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {Object.keys(allMessages)
                .sort()
                .map((lang) => {
                  return (
                    <MenuItem onClick={() => this.handleClose(lang, locale)} key={lang} selected={locale === lang}>
                      <img src={allMessages[lang].flag} alt='' className={classes.flagIcon} />
                      <div className={classes.languageName}>{allMessages[lang].nativeName}</div>
                    </MenuItem>
                  );
                })}
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
