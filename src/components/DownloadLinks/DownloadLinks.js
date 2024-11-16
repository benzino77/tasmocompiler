import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { FormattedMessage } from 'react-intl';

class DownloadLinks extends Component {
  constructor(props) {
    super(props);
    this.downloadLinksElement = React.createRef();
  }

  componentDidMount() {
    // this.downloadLinksElement.current.scrollIntoView({
    //   block: 'end',
    //   inline: 'nearest',
    //   behavior: 'smooth'
    // });
    this.downloadLinksElement.current.scrollIntoView(false);
  }

  render() {
    const { classes, features } = this.props;
    const isEsp8266 = features.board.chip_type === 'esp8266';
    const isEsp32 = features.board.chip_type === 'esp32';
    const envPath = features.board.platformio_env_name;

    return (
      <div ref={this.downloadLinksElement}>
        <div className={classes.donationLinks}>
          <Typography>If TasmoCompiler is useful to You, please consider supporting the project:</Typography>
          <a href='https://ko-fi.com/benzino77' target='_blank' rel='noopener noreferrer'>
            <img src='img/kofi.svg' alt='ko-fi' className={classes.donationImage} />
          </a>
          <a href='https://github.com/sponsors/benzino77' target='_blank' rel='noopener noreferrer'>
            <img src='img/github.svg' alt='github sponsor' className={classes.donationImage} />
          </a>
          <a href='https://paypal.me/tasmocompiler' target='_blank' rel='noopener noreferrer'>
            <img src='img/paypal.svg' alt='paypal' className={classes.donationImage} />
          </a>
        </div>

        <Typography variant='caption' className={classes.links}>
          <FormattedMessage id='stepDownload' />
        </Typography>
        <div className={classes.links}>
          <Button
            variant='contained'
            color='primary'
            href={`/download/${envPath}.bin`}
            className={classes.downloadButtons}
          >
            firmware.bin
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
          {isEsp8266 && (
            <Button
              variant='contained'
              color='primary'
              href={`/download/${envPath}.bin.gz`}
              className={classes.downloadButtons}
            >
              firmware.bin.gz
              <CloudDownloadIcon className={classes.rightIcon} />
            </Button>
          )}
          {isEsp32 && (
            <Button
              variant='contained'
              color='primary'
              href={`/download/${envPath}.factory.bin`}
              className={classes.downloadButtons}
            >
              firmware.factory.bin
              <CloudDownloadIcon className={classes.rightIcon} />
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            href='/download/platformio_override.ini'
            className={classes.downloadButtons}
          >
            platformio_override.ini
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant='contained'
            color='primary'
            href='/download/user_config_override.h'
            className={classes.downloadButtons}
          >
            user_config_override.h
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
        </div>
      </div>
    );
  }
}

DownloadLinks.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  features: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DownloadLinks;
