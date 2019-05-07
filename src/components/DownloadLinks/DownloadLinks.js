import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const DownloadLinks = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant='caption' className={classes.link}>
        You can now download custom compiled binary and files used during compilation:
      </Typography>
      <Typography>
        <Link href={'/download/firmware.bin'} className={classes.link}>firmware.bin</Link>
        <Link href={'/download/platformio.ini'} className={classes.link}>platformio.ini</Link>
        <Link href={'/download/user_config_override.h'} className={classes.link}>user_config_override.h</Link>
      </Typography>
    </React.Fragment>
  )
}

export default DownloadLinks;
