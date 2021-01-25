import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import availableFeatures from './AvailableFeatures';
import availableBoards from './AvailableBoards';
import FeaturesSelector from './FeaturesSelector';
import NextButton from '../NextButton';
import BackButton from '../BackButton';
import { FormattedMessage } from 'react-intl';

const getFeaturesDefaultStates = (board) => {
  const defaults = {};
  availableFeatures.forEach((feature) => {
    if (
      feature.boards.includes(board.name) ||
      feature.boards.includes('all') ||
      board.include_features.includes(feature.name)
    ) {
      const value = board.include_features.includes(feature.name)
        ? true
        : feature.value;

      defaults[feature.name] = value;
      if (feature.group) {
        feature.group.forEach((g) => {
          defaults[g] = value;
        });
      }
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
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.exclude
  );

  if (filtered.length > 0) {
    return filtered[0].exclude;
  }

  return [];
};

const getFeatureInclude = (name) => {
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.include
  );

  if (filtered.length > 0) {
    return filtered[0].include;
  }

  return [];
};

const getCustomParametersForFeature = (name) => {
  const filtered = availableFeatures.filter((e) => e.name === name && e.custom);
  if (filtered.length > 0) {
    return filtered[0].custom;
  }

  return '';
};

const getBuildFlagForFeature = (name) => {
  const filtered = availableFeatures.filter(
    (e) => e.name === name && e.buildflag
  );
  if (filtered.length > 0) {
    return filtered[0].buildflag;
  }

  return '';
};

const setFeature = (name, state) => {
  const newState = {};
  const group = getFeatureGroup(name);
  const custom = getCustomParametersForFeature(name);
  const buildFlag = getBuildFlagForFeature(name);

  newState[name] = state;
  group.forEach((item) => {
    newState[item] = state;
  });

  if (custom) {
    newState[`precustom_${name}`] = state ? custom : '';
  }

  if (buildFlag) {
    newState[`buildflag_${name}`] = state ? buildFlag : '';
  }
  return newState;
};

class FeaturesStep extends Component {
  constructor(props) {
    super(props);

    const defaultBoard = availableBoards.filter((b) => b.default === true);
    const defaultStates = getFeaturesDefaultStates(defaultBoard[0]);
    this.state = { options: { board: defaultBoard[0], ...defaultStates } };

    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChangeCheckBox(event) {
    let featureState = setFeature(event.target.name, event.target.checked);
    const excludeGroup = getFeatureExclude(event.target.name);
    const includeGroup = getFeatureInclude(event.target.name);

    if (event.target.checked) {
      excludeGroup.forEach((item) => {
        featureState = {
          ...featureState,
          ...setFeature(item, !event.target.checked),
        };
      });
      includeGroup.forEach((item) => {
        featureState = {
          ...featureState,
          ...setFeature(item, event.target.checked),
        };
      });
    }

    this.setState(featureState);
  }

  handleNext() {
    const { nextHandler } = this.props;
    nextHandler({ ...this.state });
  }

  handleBack() {
    const { backHandler } = this.props;
    backHandler();
  }

  handleRadioChange(event) {
    const boards = availableBoards.filter((b) => b.name === event.target.value);
    const defaultStates = getFeaturesDefaultStates(boards[0]);
    this.setState({ options: { board: boards[0], ...defaultStates } });
  }

  render() {
    const { board, ...tempState } = this.state.options;
    const { classes, nextHandler, backHandler, ...other } = this.props;
    const Wire = ({ children, ...props }) => children(props);

    return (
      <Step {...other}>
        <StepLabel>
          <FormattedMessage id="stepFeaturesTitle" />
        </StepLabel>
        <StepContent>
          <Typography>
            To jest opis tego punktu z wyborem płytki
            {/* <FormattedMessage id="stepFeaturesBoard /> */}
          </Typography>
          <div className={classes.actionsContainer}>
            <RadioGroup
              row
              aria-label="board"
              name="board"
              value={board.name}
              onChange={this.handleRadioChange}
            >
              {availableBoards.map((item, index) => {
                const { name, description, tooltip, show } = item;
                return (
                  show && (
                    // tooltips workaround
                    <Wire
                      value={name}
                      key={index}
                      className={classes.radioContainer}
                    >
                      {(props) => (
                        <Tooltip
                          title={
                            // tooltip ? <FormattedMessage id={tooltip} /> : ''
                            tooltip
                          }
                        >
                          <FormControlLabel
                            control={<Radio />}
                            label={description}
                            labelPlacement="end"
                            {...props}
                          />
                        </Tooltip>
                      )}
                    </Wire>
                  )
                );
              })}
            </RadioGroup>
            <FormHelperText>
              {/* <FormattedMessage id="stepFeaturesMicrocontrollerHelper" /> */}
            </FormHelperText>
          </div>

          <Typography>
            <FormattedMessage id="stepFeaturesDesc" />
          </Typography>
          <div className={classes.actionsContainer}>
            {availableFeatures.map(
              (item) =>
                item.show &&
                (item.boards.includes(board.name) ||
                  item.boards.includes('all')) && (
                  <FeaturesSelector
                    classes={classes}
                    // value={this.state[item.name]}
                    value={tempState[item.name]}
                    item={item}
                    onChange={this.handleChangeCheckBox}
                    key={item.name}
                  />
                )
            )}
          </div>
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

FeaturesStep.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextHandler: PropTypes.func.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default FeaturesStep;
