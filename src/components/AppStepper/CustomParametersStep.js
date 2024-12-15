import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import NextButton from './NextButton';
import BackButton from './BackButton';
import { FormattedMessage } from 'react-intl';

class CustomParametersStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customParams: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { pstate } = this.props;

    const ncp = Object.keys(pstate.features)
      .filter((name) => name.startsWith('precustom#'))
      .reduce((acc, cval) => `${acc}\n${pstate.features[cval]}`, '');

    const pcp = Object.keys(prevProps.pstate.features)
      .filter((name) => name.startsWith('precustom#'))
      .reduce((acc, cval) => `${acc}\n${prevProps.pstate.features[cval]}`, '');

    if (ncp !== pcp) {
      this.setState({ customParams: ncp.trim() });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNext() {
    const { nextHandler } = this.props;
    nextHandler({ ...this.state });
  }

  handleBack() {
    const { backHandler } = this.props;
    backHandler();
  }

  render() {
    const { classes, nextHandler, backHandler, ...other } = this.props;
    const { customParams } = this.state;
    const placeholder =
      '#ifdef USE_MCP230xx\n #undef USE_MCP230xx\n#endif\n#define USE_MCP230xx\n\n' +
      '#ifdef USE_MCP230xx_ADDR\n #undef USE_MCP230xx_ADDR\n#endif\n#define USE_MCP230xx_ADDR 0x20\n';

    return (
      <Step {...other}>
        <StepLabel classes={{ label: classes.stepLabel }}>
          <FormattedMessage id='stepCustomParamsTitle' />
        </StepLabel>
        <StepContent>
          <Typography>
            <FormattedMessage values={{ filename: <em>user_config_override.h</em> }} id='stepCustomParamsDesc' />
          </Typography>
          <form noValidate autoComplete='off'>
            <div className={classes.actionsContainer}>
              <TextField
                // id='reg_customParams'
                placeholder={placeholder}
                name='customParams'
                label={<FormattedMessage id='stepCustomParamsTitle' />}
                fullWidth
                multiline
                minRows={9}
                maxRows={9}
                className={classes.multiTextField}
                value={customParams}
                onChange={this.handleChange}
                margin='normal'
                InputProps={{
                  classes: {
                    input: classes.inputFont,
                  },
                }}
              />
            </div>
          </form>
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <BackButton disabled={false} onClick={this.handleBack} />
            </div>
            <div className={classes.wrapper}>
              <NextButton disabled={false} onClick={this.handleNext} />
            </div>
          </div>
        </StepContent>
      </Step>
    );
  }
}

CustomParametersStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  pstate: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextHandler: PropTypes.func.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default CustomParametersStep;
