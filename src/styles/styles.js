const styles = (theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectPageContainer: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(2),
  },
  projectPageImg: {
    width: '100%',
    height: '100%',
    color: theme.palette.background.paper,
    // filter: 'invert(95%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(102%) contrast(101%)',
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
  stepper: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
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
    margin: theme.spacing(),
    minWidth: 180,
  },
  languageContainer: {
    margin: theme.spacing(),
    maxWidth: 440,
    minWidth: 180,
  },
  tasmotaLangSelector: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    // marginLeft: theme.spacing(),
    // marginRight: theme.spacing(),
    margin: theme.spacing(),
    width: 180,
  },
  multiTextField: {
    margin: theme.spacing(),
    // width: 300,
  },
  compileMessagesBox: {
    marginLeft: theme.spacing(3),
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
  featuresHeaderContainer: {
    display: 'flex',
    gap: theme.spacing(),
  },
  chipTypesContainer: {},
  links: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  donationLinks: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    position: 'relative',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
  },
  donationImage: {
    width: 36,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
