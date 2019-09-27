import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

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
    const { classes } = this.props;

    return (
      <div ref={this.downloadLinksElement}>
        <Typography variant="caption" className={classes.links}>
          You can now download custom compiled binary and files used during compilation:
        </Typography>
        <div className={classes.links}>
          <Button variant="contained" color="primary" href="/download/firmware.bin" className={classes.downloadButtons}>
              firmware.bin
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
          <Button variant="contained" color="primary" href="/download/platformio.ini" className={classes.downloadButtons}>
              platformio.ini
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
          <Button variant="contained" color="primary" href="/download/user_config_override.h" className={classes.downloadButtons}>
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
};

export default DownloadLinks;
