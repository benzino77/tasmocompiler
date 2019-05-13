import React, { Component } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import BackButton from './../BackButton';
import CompileButton from './../CompileButton';
import VersionSelector from './VersionSelector';
import coreVersions from './Variables/CoreVersions';
import languages from './Variables/Languages';
import boardVersions from './Variables/BoardVersions';

class VersionStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasmotaVersion: 'development',
      coreVersion: coreVersions[1].value,
      MY_LANGUAGE: languages[0].value,
      boardVersion: boardVersions[0].value,
      memoryBuildFlag: 'eagle.flash.1m0.ld',
      message: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCompile = this.handleCompile.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange(event) {
    let memoryBuildFlag;

    if (event.target.name === 'coreVersion') {
      memoryBuildFlag = event.target.value.mem_prefix;
      if (this.state.boardVersion.mem === 4) {
        memoryBuildFlag = `${memoryBuildFlag}4m1m.ld`;
      } else { // memory 1Mbit
        if (event.target.value.platform.startsWith('core_2_5_')) {
          memoryBuildFlag = `${memoryBuildFlag}1m.ld`;
        } else {
          memoryBuildFlag = `${memoryBuildFlag}1m0.ld`;
        }
      }
    }

    if (event.target.name === 'boardVersion') {
      memoryBuildFlag = this.state.coreVersion.mem_prefix;
      if (event.target.value.mem === 4) {
        memoryBuildFlag = `${memoryBuildFlag}4m1m.ld`;
      } else {
        if (this.state.coreVersion.platform.startsWith('core_2_5_')) {
          memoryBuildFlag = `${memoryBuildFlag}1m.ld`;
        } else {
          memoryBuildFlag = `${memoryBuildFlag}1m0.ld`;
        }
      }
    }

    if (memoryBuildFlag) {
      this.setState({ [event.target.name]: event.target.value, memoryBuildFlag });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleCompile() {
    this.props.compileHandler({ ...this.state })
  }

  handleBack() {
    this.props.backHandler();
  }

  render() {
  const stepName = 'Select versions and compile';
  const { message } = this.state;
  const { classes, backHandler, repoTags, compiling, compileHandler, ...other } = this.props;

  return (
    <Step  {...other}>
      <StepLabel error={message.length > 0 && this.props.active}>{stepName}</StepLabel>
        <StepContent>
          <Typography>Select Tasmota and Arduino Core version. Choose the language you want to use and your hardware.</Typography>
            <form className={classes.actionsContainer} autoComplete='off'>
              <VersionSelector items={repoTags} name='tasmotaVersion' value={this.state.tasmotaVersion} label='Tasmota version' onChange={this.handleChange} classes={classes}/>
              <VersionSelector items={coreVersions} name='coreVersion' value={this.state.coreVersion} label='Core version' onChange={this.handleChange} classes={classes}/>
              <VersionSelector items={languages} name='MY_LANGUAGE' value={this.state.MY_LANGUAGE} label='Language' onChange={this.handleChange} classes={classes}/>
              <VersionSelector items={boardVersions} name='boardVersion' value={this.state.boardVersion} label='Board version' onChange={this.handleChange} classes={classes}/>
          </form>
          <div className={classes.actionsContainer}>
            <div className={classes.wrapper}>
              <BackButton disabled={compiling} onClick={this.handleBack}/>
            </div>
            <div className={classes.wrapper}>
              <CompileButton disabled={compiling} onClick={this.handleCompile}/>
              {compiling && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </div>
          {message && <Typography color="error" variant="subtitle1">Error: {message}</Typography>}
        </StepContent>
    </Step>
  );
  }
}

export default VersionStep;
