import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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
      .then(res => res.json())
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
      .then(res => res.json())
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
        .then(res => res.json())
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
    const stepName = 'Tasmota source code';
    const {
      classes,
      nextHandler,
      ...other
    } = this.props;

    const {
      isRepo,
      message,
      cloning,
      gettingTags,
    } = this.state;

    return (
      <Step {...other}>
        <StepLabel error={message.length > 0 && other.active}>{stepName}</StepLabel>
        <StepContent>
          {isRepo
            ? (
              <Typography>
                You can refresh source code to the latest state or click NEXT to go to the next step
              </Typography>
            )
            : (
              <Typography>
                Before you go to the next step, you have to download Tasmota source code
              </Typography>
            )
          }
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <Button
                disabled={cloning || gettingTags}
                variant="contained"
                color="primary"
                onClick={this.handleClonePull}
                // className={classes.button}
              >
                {isRepo ? 'Refresh source' : 'Download source'}
              </Button>
              {cloning && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <div className={classes.wrapper}>
              <NextButton disabled={!isRepo || cloning || gettingTags} onClick={this.handleNext} />
              {gettingTags && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </div>
          {message && (
            <Typography color="error" variant="subtitle1">
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
