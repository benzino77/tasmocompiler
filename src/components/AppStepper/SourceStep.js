import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

import NextButton from './NextButton';

class SourceStep extends Component {
  constructor(props) {
    super(props);

    this.tags = [];
    this.state = {
      isRepo: false,
      message: '',
      cloning: false,
      gettingTags: false,
    };

    this.handleClonePull = this.handleClonePull.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/repoavailability')
      .then((res) => res.json())
      .then((ret) => {
        this.setState({ isRepo: ret.result, message: '' });
      })
      .catch((error) => {
        this.setState({ isRepo: false, message: error.message });
      });
  }

  handleClonePull() {
    const { isRepo } = this.state;
    const uri = isRepo ? '/api/v1/pullrepo' : '/api/v1/clonerepo';

    this.setState({ cloning: true });
    fetch(uri)
      .then((res) => res.json())
      .then((ret) => {
        if (!ret.ok) throw new Error(ret.message);
        this.tags = ret.tags;
        this.setState({ isRepo: true, cloning: false });
      })
      .catch((error) => {
        this.setState({ message: error.message, cloning: false });
      });
  }

  handleNext() {
    const { nextHandler } = this.props;

    if (this.tags.length === 0) {
      this.setState({ gettingTags: true });
      fetch('/api/v1/repotags')
        .then((res) => res.json())
        .then((ret) => {
          this.tags = ret.tags;
          this.setState({ gettingTags: false });
          nextHandler({ tags: this.tags });
        })
        .catch((error) => {
          this.setState({ message: error.message, gettingTags: false });
        });
    } else {
      nextHandler({ tags: this.tags });
    }
  }

  render() {
    const { classes, nextHandler, ...other } = this.props;

    const { isRepo, message, cloning, gettingTags } = this.state;

    return (
      <Step {...other}>
        <StepLabel error={message.length > 0 && other.active} classes={{ label: classes.stepLabel }}>
          <FormattedMessage id='stepSourceTitle' />
        </StepLabel>
        <StepContent>
          {isRepo ? (
            <Typography>
              <FormattedMessage id='stepSourceDescRefresh' />
            </Typography>
          ) : (
            <Typography>
              <FormattedMessage id='stepSourceDescDownload' />
            </Typography>
          )}
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <Button
                disabled={cloning || gettingTags}
                variant='contained'
                color='primary'
                onClick={this.handleClonePull}
                // className={classes.button}
              >
                {isRepo ? <FormattedMessage id='btnRefreshSrc' /> : <FormattedMessage id='btnDownloadSrc' />}
              </Button>
              {cloning && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <div className={classes.wrapper}>
              <NextButton disabled={!isRepo || cloning || gettingTags} onClick={this.handleNext} />
              {gettingTags && <CircularProgress size={24} className={classes.buttonProgress} />}
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

SourceStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextHandler: PropTypes.func.isRequired,
};

export default SourceStep;
