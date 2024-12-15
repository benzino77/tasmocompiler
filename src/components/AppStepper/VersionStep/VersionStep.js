import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { FormattedMessage } from 'react-intl';

import BackButton from '../BackButton';
import CompileButton from '../CompileButton';
import VersionSelector from './VersionSelector';
import { tasmotaGUILanguages, preselectedTasmotaGUILanguage } from './Variables/Languages';

class VersionStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasmotaVersion: 'development',
      MY_LANGUAGE: preselectedTasmotaGUILanguage,
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCompile = this.handleCompile.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCompile() {
    const { compileHandler } = this.props;
    compileHandler({ version: this.state });
  }

  handleBack() {
    const { backHandler } = this.props;
    backHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    const { repoTags } = this.props;
    if (repoTags.length !== prevProps.repoTags.length) {
      this.setState({
        tasmotaVersion: repoTags[repoTags.length - 1],
      });
    }
  }

  render() {
    const { message, tasmotaVersion, MY_LANGUAGE } = this.state;

    const { classes, backHandler, repoTags, compiling, compileHandler, ...other } = this.props;

    return (
      <Step {...other}>
        <StepLabel error={message.length > 0 && other.active} classes={{ label: classes.stepLabel }}>
          <FormattedMessage id='stepVersionTitle' />
        </StepLabel>
        <StepContent>
          <Typography>
            <FormattedMessage id='stepVersionDesc' />
          </Typography>
          <form className={classes.actionsContainer} autoComplete='off'>
            <VersionSelector
              items={repoTags}
              name='tasmotaVersion'
              value={tasmotaVersion}
              label={<FormattedMessage id='stepVersionTasmota' />}
              onChange={this.handleChange}
              classes={classes}
            />
            <VersionSelector
              items={tasmotaGUILanguages}
              name='MY_LANGUAGE'
              value={MY_LANGUAGE}
              label={<FormattedMessage id='stepVersionLanguage' />}
              onChange={this.handleChange}
              classes={classes}
              preselectedTasmotaGUILanguage={preselectedTasmotaGUILanguage}
            />
          </form>
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <BackButton disabled={compiling} onClick={this.handleBack} />
            </div>
            <div className={classes.wrapper}>
              <CompileButton disabled={compiling} onClick={this.handleCompile} />
              {compiling && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </div>
          {message && (
            <Typography color='error' variant='subtitle1'>
              Error:
              {message}
            </Typography>
          )}
        </StepContent>
      </Step>
    );
  }
}

VersionStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  repoTags: PropTypes.oneOfType([PropTypes.array]).isRequired,
  compiling: PropTypes.bool.isRequired,
  compileHandler: PropTypes.func.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default VersionStep;
