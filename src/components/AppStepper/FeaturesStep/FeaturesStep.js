import React, { Component } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import availableFeatures from './AvailableFeatures';
import FeaturesSelector from './FeaturesSelector';
import NextButton from './../NextButton';
import BackButton from './../BackButton';

const getFeaturesDefaultStates = () => {
  const defaults = {};

  availableFeatures.forEach((e) => {
    defaults[e.name] = e.value;

    if (e.group) {
      e.group.forEach((g) => {
        defaults[g] = e.value;
      });
    }
  });

  return defaults;
};

const getFeatureGroup = (name) => {
  const filtered = availableFeatures.filter((e) => e.name === name && e.group);

  if (filtered.length > 0) {
    return filtered[0].group;
  }

  return [];
};

const getFeatureExclude = (name) => {
  const filtered = availableFeatures.filter((e) => e.name === name && e.exclude);
  
  if (filtered.length > 0) {
    return filtered[0].exclude;
  }

  return [];
};

const setFeature = (name, state) => {
  const newState = {}
  const group = getFeatureGroup(name);

  newState[name] = state;
  group.forEach((item) => newState[item] = state);
  return newState;
};

class FeaturesStep extends Component {
  constructor(props) {
    super(props);

    const defaultStates = getFeaturesDefaultStates();
    this.state = {...defaultStates};

    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChangeCheckBox(event) {
    let featureState = setFeature(event.target.name, event.target.checked);
    const excludeGroup = getFeatureExclude(event.target.name);

    event.target.checked && excludeGroup.forEach((item) => featureState = { ...featureState, ...setFeature(item, !event.target.checked) });
  
    this.setState(featureState);
  }

  handleNext() {
    this.props.nextHandler({ ...this.state });
  }

  handleBack() {
    this.props.backHandler();
  }

  render() {
    const stepName = 'Select features';
    const { classes, nextHandler, backHandler, ...other } = this.props;
    return (
      <Step  {...other}>
        <StepLabel>{stepName}</StepLabel>
        <StepContent>
          <Typography>Which features should be included in final binary firmware?</Typography>
          <div className={classes.actionsContainer}>
          {availableFeatures.map((item, index) => (
            <FeaturesSelector classes={classes} value={this.state[item.name]} item={item} onChange={this.handleChangeCheckBox} key={index}/>
          ))}
        </div>
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

export default FeaturesStep;
