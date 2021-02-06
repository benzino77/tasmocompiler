const styles = (theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  language: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    cursor: 'pointer',
  },
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
    margin: theme.spacing.unit * 2,
    minWidth: 240,
    maxWidth: '80%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  versionContainer: {
    margin: theme.spacing.unit * 2,
    minWidth: 140,
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
    marginLeft: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 200,
  },
  radioContainer: {
    marginBottom: 0,
    minWidth: 200,
    maxWidth: 200,
  },
  links: {
    marginLeft: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  downloadButtons: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    position: 'relative',
  },
});

export default styles;
