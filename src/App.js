import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import io from 'socket.io-client';
import { IntlProvider } from 'react-intl';

import styles from './styles/styles';
import TopAppBar from './components/TopAppBar/TopAppBar';
import SourceStep from './components/AppStepper/SourceStep';
import VersionStep from './components/AppStepper/VersionStep/VersionStep';
import WifiStep from './components/AppStepper/WifiStep';
import FeaturesStep from './components/AppStepper/FeaturesStep/FeaturesStep';
import CustomParametersStep from './components/AppStepper/CustomParametersStep';
import MessageBox from './components/MessageBox/MessageBox';
import DownloadLinks from './components/DownloadLinks/DownloadLinks';
import { allMessages } from './locales/languages';
import languages from './components/AppStepper/VersionStep/Variables/Languages';
import availableFeatures from './components/AppStepper/FeaturesStep/AvailableFeatures';

const browserLanguages = navigator.languages ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.userLanguage;
console.log(`Detected browser languages: [${browserLanguages.join(', ')}]`);

let tcLanguage = '';
browserLanguages.forEach((language) => {
  if (tcLanguage === '') {
    const lang = language.split(/[-_]/)[0];
    if (allMessages[lang]) {
      tcLanguage = lang;
      console.log(`Browser language (${tcLanguage}) supported`);
    }
  }
});
// Set default to english if not defined on supported languages
if (tcLanguage === '') {
  tcLanguage = 'en';
  console.log(
    `Browser languages [${browserLanguages.join(', ')}] not supported. Use default (${tcLanguage})`
  );
}

let tasmoLanguage = '';
browserLanguages.forEach((language) => {
  if (tasmoLanguage === '') {
    // Help prefer pt_PT from [pt_BR, pt_PT] with pt locale
    // Will search invalid values, without match
    let languageIndex = languages.findIndex((element) =>
      element.value.toLowerCase().includes(`${language.toLowerCase()}_${language.toLowerCase()}`)
    );
    // Search with replaced minus to underscore
    if (languageIndex === -1) {
      languageIndex = languages.findIndex((element) =>
        element.value.toLowerCase().includes(language.toLowerCase().replace('-', '_'))
      );
    }
    // Search the language part only
    if (languageIndex === -1) {
      languageIndex = languages.findIndex((element) =>
        element.value.toLowerCase().includes(language.toLowerCase().split(/[-_]/)[0])
      );
    }
    if (languageIndex !== -1) {
      tasmoLanguage = languages[languageIndex].value;
      console.log(`Tasmota language (${tasmoLanguage}) supported`);
    }
  }
});
// Set English if not found current locale of browser on languages
if (tasmoLanguage === '') {
  tasmoLanguage = 'en_GB';
  console.log(
    `Tasmota languages [${browserLanguages.join(', ')}] not supported. Use default (${tasmoLanguage})`
  );
}

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
      features: {},
      network: {},
      version: {},
      customParams: '',
      guiLanguage: tcLanguage,
      tasmotaLanguage: tasmoLanguage,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCompile = this.handleCompile.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
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

    this.changeLanguage(this.state.guiLanguage);
  }

  handleNext = (data) => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
      ...data,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
      compileMessages: '',
      showMessageBox: false,
      showDownloadLinks: false,
    }));
  };

  handleCompile = (data) => {
    const uri = '/api/v1/compile';

    this.setState(
      {
        compiling: true,
        showMessageBox: true,
        compileMessages: '',
        showDownloadLinks: false,
        ...data,
      },
      () => {
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
          .then((res) => res.json())
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
      }
    );
  };

  changeLanguage = (lang) => {
    languages.sort((a, b) => {
      return allMessages[lang]['source'][a.name].localeCompare(
        allMessages[lang]['source'][b.name]
      );
    });
    availableFeatures.sort((a, b) => {
      return allMessages[lang]['source'][a.description].localeCompare(
        allMessages[lang]['source'][b.description]
      );
    });
    this.setState({ guiLanguage: lang });
  };

  render() {
    const { classes } = this.props;

    const {
      activeStep,
      tags,
      compiling,
      showMessageBox,
      showDownloadLinks,
      compileMessages,
      guiLanguage,
      tasmotaLanguage,
      ...other
    } = this.state;

    const bnHandlersProps = {
      backHandler: this.handleBack,
      nextHandler: this.handleNext,
    };

    return (
      <IntlProvider locale={guiLanguage} messages={allMessages[guiLanguage]['source']}>
        <div className={classes.root}>
          <TopAppBar
            {...this.props}
            guiLanguage={guiLanguage}
            changeLanguage={this.changeLanguage}
          />
          <Stepper activeStep={activeStep} orientation="vertical">
            <SourceStep {...this.props} nextHandler={this.handleNext} key={1} />
            <WifiStep {...this.props} {...bnHandlersProps} key={2} />
            <FeaturesStep {...this.props} {...bnHandlersProps} key={3} />
            <CustomParametersStep
              {...this.props}
              {...bnHandlersProps}
              pstate={other}
              key={4}
            />
            <VersionStep
              {...this.props}
              repoTags={tags}
              backHandler={this.handleBack}
              compileHandler={this.handleCompile}
              compiling={compiling}
              guiLanguage={guiLanguage}
              tasmotaLanguage={tasmotaLanguage}
              key={5}
            />
          </Stepper>
          {showMessageBox && (
            <MessageBox {...this.props} compileMessages={compileMessages} />
          )}
          {showDownloadLinks && (
            <DownloadLinks
              {...this.props}
              isEsp8266={
                other.features.board.name.includes('esp32') ? false : true
              }
            />
          )}
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(App);
