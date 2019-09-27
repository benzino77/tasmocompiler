import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import io from 'socket.io-client';

import styles from './styles/styles';
import TopAppBar from './components/TopAppBar/TopAppBar';
import SourceStep from './components/AppStepper/SourceStep';
import VersionStep from './components/AppStepper/VersionStep/VersionStep';
import WifiStep from './components/AppStepper/WifiStep';
import FeaturesStep from './components/AppStepper/FeaturesStep/FeaturesStep';
import CustomParametersStep from './components/AppStepper/CustomParametersStep';
import MessageBox from './components/MessageBox/MessageBox';
import DownloadLinks from './components/DownloadLinks/DownloadLinks';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      tags: [],
      compiling: false,
      showMessageBox: false,
      showDownloadLinks: false,
      compileMessages: '',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCompile = this.handleCompile.bind(this);
  }

  componentDidMount() {
    const socket = io();
    socket.on('message', (data) => {
      this.setState((state) => {
        let newMessages = state.compileMessages;
        newMessages = `${newMessages}${data}`;
        return { compileMessages: newMessages };
      });
    });

    socket.on('finished', (data) => {
      this.setState({ compiling: false, showDownloadLinks: data.ok });
    });
  }

  handleNext = (data) => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      ...data,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      compileMessages: '',
      showMessageBox: false,
      showDownloadLinks: false,
    }));
  };

  handleCompile = (data) => {
    const uri = '/api/v1/compile';

    this.setState({
      compiling: true,
      showMessageBox: true,
      compileMessages: '',
      showDownloadLinks: false,
      ...data,
    }, () => {
      const {
        compiling,
        showMessageBox,
        message,
        activeStep,
        tags,
        compileMessages,
        ...postData
      } = this.state;

      fetch(uri, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((json) => {
          if (!json.ok) {
            this.setState((state) => {
              let newMessages = state.compileMessages;
              newMessages = `${newMessages}${json.message}`;
              return { compileMessages: newMessages, compiling: false };
            });
          }
        })
        .catch((error) => {
          this.setState({ compileMessages: error.message, compiling: false });
        });
    });
  }

  render() {
    const { classes } = this.props;

    const {
      activeStep,
      tags,
      compiling,
      showMessageBox,
      showDownloadLinks,
      compileMessages,
    } = this.state;

    const bnHandlersProps = {
      backHandler: this.handleBack,
      nextHandler: this.handleNext,
    };

    return (
      <div className={classes.root}>
        <TopAppBar />
        <Stepper activeStep={activeStep} orientation="vertical">
          <SourceStep {...this.props} nextHandler={this.handleNext} key={1} />
          <WifiStep {...this.props} {...bnHandlersProps} key={2} />
          <FeaturesStep {...this.props} {...bnHandlersProps} key={3} />
          <CustomParametersStep {...this.props} {...bnHandlersProps} key={4} />
          <VersionStep
            {...this.props}
            repoTags={tags}
            backHandler={this.handleBack}
            compileHandler={this.handleCompile}
            compiling={compiling}
            key={5}
          />
        </Stepper>
        {showMessageBox && <MessageBox {...this.props} compileMessages={compileMessages} />}
        {showDownloadLinks && <DownloadLinks {...this.props} />}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(App);
