import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import NextButton from './NextButton';
import BackButton from './BackButton';
import TextFieldComponent from './TextFieldComponent';
import { FormattedMessage } from 'react-intl';

class WifiStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      STA_SSID1: '',
      STA_PASS1: '',
      WIFI_IP_ADDRESS: '',
      WIFI_SUBNETMASK: '',
      WIFI_GATEWAY: '',
      WIFI_DNS: '',
      staticIPEnabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeCheckBox(event) {
    this.setState({ [event.target.name]: event.target.checked });
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
    const { classes, backHandler, nextHandler, ...other } = this.props;

    const {
      STA_SSID1,
      STA_PASS1,
      staticIPEnabled,
      WIFI_IP_ADDRESS,
      WIFI_SUBNETMASK,
      WIFI_GATEWAY,
      WIFI_DNS,
    } = this.state;

    return (
      <Step {...other}>
        <StepLabel>
          <FormattedMessage id="stepWifiConfTitle" />
        </StepLabel>
        <StepContent>
          <Typography>
            <FormattedMessage id="stepWifiConfDesc" />
          </Typography>
          <form noValidate autoComplete="off">
            <div className={classes.actionsContainer}>
              <TextFieldComponent
                name="STA_SSID1"
                label={<FormattedMessage id="stepWifiConfSSID" />}
                classes={classes}
                value={STA_SSID1}
                onChange={this.handleChange}
              />
              <TextFieldComponent
                name="STA_PASS1"
                label={<FormattedMessage id="stepWifiConfPassword" />}
                classes={classes}
                type="password"
                value={STA_PASS1}
                onChange={this.handleChange}
              />
            </div>
            <div className={classes.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={staticIPEnabled}
                    name="staticIPEnabled"
                    onChange={this.handleChangeCheckBox}
                    value="staticIPEnabled"
                  />
                }
                label={<FormattedMessage id="stepWifiConfStaticIP" />}
              />
            </div>

            {staticIPEnabled && (
              <div className={classes.actionsContainer}>
                <TextFieldComponent
                  name="WIFI_IP_ADDRESS"
                  label={<FormattedMessage id="stepWifiConfIP" />}
                  classes={classes}
                  value={WIFI_IP_ADDRESS}
                  onChange={this.handleChange}
                />
                <TextFieldComponent
                  name="WIFI_SUBNETMASK"
                  label={<FormattedMessage id="stepWifiConfMask" />}
                  classes={classes}
                  value={WIFI_SUBNETMASK}
                  onChange={this.handleChange}
                />
                <TextFieldComponent
                  name="WIFI_GATEWAY"
                  label={<FormattedMessage id="stepWifiConfGateway" />}
                  classes={classes}
                  value={WIFI_GATEWAY}
                  onChange={this.handleChange}
                />
                <TextFieldComponent
                  name="WIFI_DNS"
                  label={<FormattedMessage id="stepWifiConfDNS" />}
                  classes={classes}
                  value={WIFI_DNS}
                  onChange={this.handleChange}
                />
              </div>
            )}
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

WifiStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextHandler: PropTypes.func.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default WifiStep;
