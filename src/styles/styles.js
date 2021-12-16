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
  languageList: {
    marginTop: theme.spacing(),
  },
  flagIcon: {
    width: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
  },
  languageName: {
    marginLeft: theme.spacing(),
  },
  root: {
    width: '100%',
  },
  stepLabel: {
    fontSize: theme.typography.body1.fontSize,
  },
  button: {
    marginTop: theme.spacing(),
    marginRight: theme.spacing(),
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
    margin: theme.spacing(),
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing(),
    // display: 'flex',
    minWidth: 120,
  },
  actionsContainer: {
    // marginBottom: theme.spacing(2),
    // marginTop: theme.spacing(),
    // marginRight: theme.spacing(),
    // marginLeft: theme.spacing(),
    margin: theme.spacing(2),
    minWidth: 240,
    maxWidth: '80%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  versionContainer: {
    margin: theme.spacing(2),
    minWidth: 160,
  },
  languageContainer: {
    margin: theme.spacing(2),
    maxWidth: 400,
    minWidth: 160,
  },
  tasmotaLangSelector: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    // marginLeft: theme.spacing(),
    // marginRight: theme.spacing(),
    margin: theme.spacing(),
    width: 160,
  },
  multiTextField: {
    margin: theme.spacing(),
    // width: 300,
  },
  compileMessagesBox: {
    marginLeft: theme.spacing(2),
    marginTop: 0,
    maxWidth: '80%',
  },
  inputFont: {
    // display: 'block',
    fontFamily: 'monospace',
  },
  checkboxContainer: {
    marginBottom: 0,
    marginLeft: theme.spacing(),
    minWidth: 230,
    maxWidth: 230,
  },
  radioContainer: {
    marginBottom: 0,
    marginLeft: theme.spacing(),
    minWidth: 230,
    maxWidth: 230,
  },
  chipTypesContainer: {
  },
  links: {
    marginLeft: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  downloadButtons: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    position: 'relative',
  },
  boardsDivider: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
});

export default styles;
