const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  buttonProgress: {
    color: 'default',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit,
    // display: 'flex',
    minWidth: 120,
  },
  actionsContainer: {
    // marginBottom: theme.spacing.unit * 2,
    // marginTop: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // marginLeft: theme.spacing.unit,
    margin: theme.spacing.unit,
    minWidth: 140,
    maxWidth: '70%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    margin: theme.spacing.unit,
    width: 160,
  },
  multiTextField: {
    margin: theme.spacing.unit,
    // width: 300,
  },
  compileMessagesBox: {
    'margin-left': theme.spacing.unit * 3,
    'margin-top': 0,
    // display: 'flex',
    maxWidth: '80%',
  },
  inputFont: {
    // display: 'block',
    'font-family': 'monospace',
  },
  checkboxContainer: {
    marginBottom: 0,
    marginLeft: theme.spacing.unit * 2,
    minWidth: 160,
  },
  link: {
    'margin-left': theme.spacing.unit * 3,
  },
});

export default styles;
