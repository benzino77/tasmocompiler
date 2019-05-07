import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

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
        label='Compiling progress'
        fullWidth={true}
        multiline={true}
        rows={9}
        rowsMax={9}
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
    )
  }
}

export default MessageBox;
