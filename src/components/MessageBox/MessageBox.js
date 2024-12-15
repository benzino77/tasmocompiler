import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { FormattedMessage } from 'react-intl';

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.messageBoxElement = React.createRef();
  }

  componentDidUpdate() {
    this.messageBoxElement.current.scrollTop = this.messageBoxElement.current.scrollHeight;
  }

  render() {
    const { classes, compileMessages } = this.props;

    return (
      <TextField
        name='compileMessages'
        label={<FormattedMessage id='stepVersionCompProgress' />}
        fullWidth
        multiline
        minRows={9}
        maxRows={9}
        className={classes.compileMessagesBox}
        value={compileMessages}
        variant='outlined'
        margin='normal'
        inputRef={this.messageBoxElement}
        InputProps={{
          classes: {
            input: classes.inputFont,
          },
          readOnly: true,
        }}
      />
    );
  }
}

MessageBox.propTypes = {
  // classes: PropTypes.object.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  compileMessages: PropTypes.string.isRequired,
};

export default MessageBox;
