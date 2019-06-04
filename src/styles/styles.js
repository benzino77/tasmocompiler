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
    marginLeft: theme.spacing.unit * 3,
    marginTop: 0,
    maxWidth: '80%',
  },
  inputFont: {
    // display: 'block',
    fontFamily: 'monospace',
  },
  checkboxContainer: {
    marginBottom: 0,
    marginLeft: theme.spacing.unit * 2,
    minWidth: 160,
  },
  links: {
    marginLeft: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  downloadButtons: {
    marginRight: theme.spacing.unit * 2,
    marginTop:  theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
});

export default styles;
