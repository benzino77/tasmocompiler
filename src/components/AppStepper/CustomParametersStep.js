import React, { Component } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import NextButton from './NextButton';
import BackButton from './BackButton';

class CustomParametersStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customParams: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNext() {
    this.props.nextHandler({ ...this.state });
  }

  handleBack() {
    this.props.backHandler();
  }

  render() {
    const stepName = 'Custom parameters';
    const { classes, nextHandler, backHandler, ...other } = this.props;
    const placeholder = '#ifdef USE_MCP230xx\n #undef USE_MCP230xx\n#endif\n#define USE_MCP230xx\n\n' +
                        '#ifdef USE_MCP230xx_ADDR\n #undef USE_MCP230xx_ADDR\n#endif\n#define USE_MCP230xx_ADDR 0x20\n'

    return (
      <Step  {...other}>
        <StepLabel>{stepName}</StepLabel>
        <StepContent>
          <Typography>Below you can enter custom parameters, which will be included at the end of <em>user_config_overwrite.h</em> file. If you don't know what it is, just click Next.</Typography>
          <form  noValidate autoComplete='off'>
            <div className={classes.actionsContainer}>
            <TextField
              // id='reg_customParams'
              placeholder={placeholder}
              name='customParams'
              label='Custom parameters'
              fullWidth={true}
              multiline={true}
              rows={9}
              rowsMax={9}
              className={classes.multiTextField}
              value={this.state.customParams}
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
              <BackButton onClick={this.handleBack}/>
            </div>
            <div className={classes.wrapper}>
              <NextButton onClick={this.handleNext}/>
            </div>
          </div>
        </StepContent>
      </Step>
    );
  }
}

export default CustomParametersStep;
