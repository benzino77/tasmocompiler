import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

class DownloadLinks extends Component {
  constructor(props) {
    super(props);
    this.downloadLinksElement = React.createRef();
  }

  componentDidMount() {
    // this.downloadLinksElement.current.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' });
    this.downloadLinksElement.current.scrollIntoView(false);
  }

  render() {
    const { classes } = this.props;

    return (
      <div ref={this.downloadLinksElement}>
        <Typography variant='caption' className={classes.link}>
          You can now download custom compiled binary and files used during compilation:
        </Typography>
        <Typography>
          <Link href={'/download/firmware.bin'} className={classes.link}>firmware.bin</Link>
          <Link href={'/download/platformio.ini'} className={classes.link}>platformio.ini</Link>
          <Link href={'/download/user_config_override.h'} className={classes.link}>user_config_override.h</Link>
        </Typography>
      </div>
    )
  }
}

export default DownloadLinks;
